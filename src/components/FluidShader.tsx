import { useEffect, useRef, useState } from 'react';

const VS = `
  attribute vec2 a;
  void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FS = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_intensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.866, 0.500, -0.500, 0.866);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.0;
      a *= 0.5;
    }
    return v;
  }
  float fluid(vec2 p, float t, out vec2 q, out vec2 r) {
    q = vec2(
      fbm(p + vec2(t * 0.18,  t * 0.05)),
      fbm(p + vec2(5.2, 1.3) + vec2(t * 0.10, -t * 0.12))
    );
    r = vec2(
      fbm(p + 1.7 * q + vec2(1.7, 9.2) + vec2(t * 0.14, t * 0.09)),
      fbm(p + 1.7 * q + vec2(8.3, 2.8) + vec2(t * 0.11, t * 0.13))
    );
    return fbm(p + 3.4 * r);
  }
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;
    float t = u_time;

    vec2 mp = u_mouse;
    mp.x *= aspect;
    vec2 toMouse = (mp - vec2(aspect * 0.5, 0.5)) * 0.14;

    vec2 q, r;
    float density = fluid(p * 1.4 + toMouse, t * 0.7, q, r);
    float speed = length(r - 0.5);

    vec3 cBlack   = vec3(0.008, 0.018, 0.028);
    vec3 cDeep    = vec3(0.022, 0.078, 0.075);
    vec3 cEmerald = vec3(0.082, 0.280, 0.215);
    vec3 cBright  = vec3(0.180, 0.520, 0.380);
    vec3 cHot     = vec3(0.380, 0.870, 0.620);
    vec3 cWhiteH  = vec3(0.760, 0.980, 0.880);

    vec3 col = mix(cBlack,   cDeep,    smoothstep(0.10, 0.45, density));
    col      = mix(col,      cEmerald, smoothstep(0.42, 0.65, density));
    col      = mix(col,      cBright,  smoothstep(0.62, 0.80, density) * 0.85);
    col      = mix(col,      cHot,     smoothstep(0.78, 0.92, density) * 0.70);

    float filament = smoothstep(0.22, 0.50, speed) *
                     smoothstep(0.55, 0.85, density);
    col = mix(col, cWhiteH, filament * 0.45);

    vec2 vUv = uv - 0.5;
    vUv.x *= 1.55;
    float vig = 1.0 - smoothstep(0.30, 1.05, length(vUv)) * 0.82;
    col *= vig;

    float grain = (hash(uv * u_resolution + t * 60.0) - 0.5) * 0.030;
    col += grain;

    col = col / (col + 0.6) * 1.6;
    col = pow(col, vec3(0.92));

    col *= u_intensity;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const FluidShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isMobile && !reduceMotion) setDesktop(true);
  }, []);

  useEffect(() => {
    if (!desktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VS);
    const fs = compile(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uIntensity = gl.getUniformLocation(prog, 'u_intensity');

    gl.uniform1f(uIntensity, 0.65);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let targetMx = 0.5, targetMy = 0.5;
    let mx = 0.5, my = 0.5;
    const onMove = (e: MouseEvent) => {
      targetMx = e.clientX / window.innerWidth;
      targetMy = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove);

    const start = performance.now();
    let raf = 0;
    let paused = false;

    const frame = () => {
      if (!paused) {
        mx += (targetMx - mx) * 0.05;
        my += (targetMy - my) * 0.05;
        gl.uniform2f(uMouse, mx, my);
        gl.uniform1f(uTime, (performance.now() - start) / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [desktop]);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: '#050a0f' }}
      >
        {desktop && <canvas ref={canvasRef} className="w-full h-full block" />}
      </div>
      {desktop && (
        <div
          aria-hidden
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(5,10,15,0.82) 95%), linear-gradient(180deg, rgba(5,10,15,0.5) 0%, transparent 14%, transparent 80%, rgba(5,10,15,0.88) 100%)',
          }}
        />
      )}
    </>
  );
};

export default FluidShader;
