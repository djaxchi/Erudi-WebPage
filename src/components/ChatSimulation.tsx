import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const FONT = '"Bricolage Grotesque", system-ui, sans-serif';
const TYPING_MS = 16;
const PAUSE_AFTER_MS = 3200;

export interface ChatScenario {
  userMessage: string;
  aiResponse: string;
  label?: string; // short tab label; auto-derived if omitted
}

interface ChatSimulationProps {
  scenarios?: readonly ChatScenario[];
  footerLink?: string;
  footerText?: string;
}

const DEFAULT_SCENARIOS: readonly ChatScenario[] = [
  {
    label: 'Account brief',
    userMessage: 'Brief me on the Dupont account before my 3pm call.',
    aiResponse:
      'Last contact was 12 days ago, follow-up on the Q1 delivery delay. Three open tickets, one pending sign-off on the revised SLA. Next step: confirm Q2 roadmap and push the renewal conversation. Want me to draft talking points?',
  },
  {
    label: 'Contract scan',
    userMessage: 'Extract all penalty clauses from our 23 supplier contracts.',
    aiResponse:
      'Done. Penalty clauses found in 19 of 23 contracts. Six include automatic late-payment penalties above 1.5%, flagged for legal review. Results structured by supplier, clause type and trigger condition. Exporting to your shared drive now.',
  },
  {
    label: 'HR policy',
    userMessage: 'What does our HR policy say about contractor remote work?',
    aiResponse:
      'Per HR Policy v4.2, contractors on fixed-term agreements may work remotely up to 3 days per week, provided the project manager approves in writing and the client contract allows it. Source: section 7.3, page 14.',
  },
  {
    label: 'RFP analysis',
    userMessage: 'We just received a 90-page RFP. Summarize and flag anything unusual.',
    aiResponse:
      'Infrastructure modernisation project, 400-person logistics firm, 18-month timeline, ~800k€ budget. Two flags: very short response window (9 days) and an IP clause transferring all work to the client including pre-existing tools. Worth legal review before committing.',
  },
];

/** Rough ms for a full scenario: pause + stream + hold */
function scenarioDuration(s: ChatScenario): number {
  return 900 + s.aiResponse.length * TYPING_MS + PAUSE_AFTER_MS;
}

export const ChatSimulation: React.FC<ChatSimulationProps> = ({
  scenarios,
  footerLink = '/contact',
  footerText,
}) => {
  const active = scenarios ?? DEFAULT_SCENARIOS;

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'query' | 'streaming' | 'done'>('query');
  const [streamedText, setStreamedText] = useState('');
  const [contentVisible, setContentVisible] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  // When true: user has clicked a tab - stay on that scenario, no auto-advance
  const [pinned, setPinned] = useState(false);
  const aliveRef = useRef(true);

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  const runScenario = useCallback(
    async (scenarioIdx: number, isPinned: boolean) => {
      aliveRef.current = true;
      const scenario = active[scenarioIdx];

      setStreamedText('');
      setPhase('query');
      setProgressKey((k) => k + 1);

      await sleep(isPinned ? 0 : 900);
      if (!aliveRef.current) return;

      setPhase('streaming');
      for (let i = 0; i <= scenario.aiResponse.length; i++) {
        if (!aliveRef.current) return;
        await sleep(TYPING_MS);
        setStreamedText(scenario.aiResponse.slice(0, i));
      }

      setPhase('done');

      // In pinned mode: stay here indefinitely
      if (isPinned) return;

      await sleep(PAUSE_AFTER_MS);
      if (!aliveRef.current) return;

      setContentVisible(false);
      await sleep(380);
      if (!aliveRef.current) return;

      setIdx((prev) => (prev + 1) % active.length);
    },
    [active]
  );

  useEffect(() => {
    aliveRef.current = false;
    setContentVisible(true);
    const t = setTimeout(() => runScenario(idx, pinned), 80);
    return () => {
      clearTimeout(t);
      aliveRef.current = false;
    };
  }, [idx, pinned]); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = (next: number) => {
    if (next === idx && pinned) return;
    aliveRef.current = false;
    setPinned(true);
    // Instant switch - no fade, content appears immediately
    setStreamedText('');
    setPhase('query');
    setContentVisible(true);
    setIdx(next);
  };

  const scenario = active[idx];
  // In pinned mode the fill bar just shows streaming progress, not a countdown
  const tabDuration = pinned
    ? 900 + scenario.aiResponse.length * TYPING_MS
    : scenarioDuration(scenario);

  return (
    <div
      style={{
        fontFamily: FONT,
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '4px',
        overflow: 'hidden',
        width: '100%',
        height: '420px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Body ── */}
      <div
        style={{
          flex: 1,
          padding: '28px 24px 20px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <AnimatePresence mode="wait">
          {contentVisible && (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
            >
              {/* User query */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                style={{ marginBottom: '22px' }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    letterSpacing: '0.13em',
                    color: '#555d66',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    marginBottom: '7px',
                  }}
                >
                  You
                </span>
                <p
                  style={{
                    margin: 0,
                    color: '#c0c5cb',
                    fontSize: '14.5px',
                    lineHeight: 1.55,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {scenario.userMessage}
                </p>
              </motion.div>

              {/* AI response */}
              {(phase !== 'query' || streamedText) && (
                <>
                  <div
                    style={{
                      height: '1px',
                      background: 'rgba(255,255,255,0.06)',
                      marginBottom: '22px',
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.28 }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: '10px',
                        letterSpacing: '0.13em',
                        color: '#34d399',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        marginBottom: '9px',
                      }}
                    >
                      Erudi AI
                    </span>
                    <p
                      style={{
                        margin: 0,
                        color: '#ffffff',
                        fontSize: '15px',
                        lineHeight: 1.65,
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {streamedText}
                      {phase === 'streaming' && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: '2px',
                            height: '1.1em',
                            background: '#34d399',
                            marginLeft: '2px',
                            verticalAlign: 'text-bottom',
                            animation: 'chatsim-blink 0.9s step-start infinite',
                          }}
                        />
                      )}
                    </p>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Tab nav ── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexShrink: 0,
        }}
      >
        {active.map((s, i) => {
          const isActive = i === idx;
          const tabLabel = s.label ?? `0${i + 1}`;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                flex: 1,
                position: 'relative',
                background: 'none',
                border: 'none',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                padding: '12px 10px 11px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background .2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              {/* Index */}
              <span
                style={{
                  display: 'block',
                  fontSize: '9.5px',
                  letterSpacing: '0.08em',
                  color: isActive ? '#34d399' : '#3d434b',
                  fontVariantNumeric: 'tabular-nums',
                  fontWeight: 500,
                  marginBottom: '3px',
                  transition: 'color .25s ease',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {/* Label */}
              <span
                style={{
                  display: 'block',
                  fontSize: '11.5px',
                  letterSpacing: '-0.01em',
                  color: isActive ? '#ffffff' : '#555d66',
                  fontWeight: 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'color .25s ease',
                }}
              >
                {tabLabel}
              </span>

              {/* Top progress fill - only on active tab */}
              {isActive && (
                <span
                  key={progressKey}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '2px',
                    background: '#34d399',
                    width: 0,
                    animation: `chatsim-fill ${tabDuration}ms linear forwards`,
                  }}
                />
              )}
              {/* Idle rule on inactive tabs */}
              {!isActive && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'rgba(255,255,255,0.04)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Footer CTA ── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '13px 16px 13px 24px',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            flex: 1,
            fontSize: '13px',
            color: '#6b7280',
            letterSpacing: '-0.005em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {footerText}
        </span>
        <Link
          to={footerLink}
          aria-label={footerText || 'Get in touch'}
          style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #34d399, #059669)',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 24px rgba(16,185,129,0.45)',
            transition: 'transform .2s ease, box-shadow .2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.boxShadow = '0 0 34px rgba(16,185,129,0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 0 24px rgba(16,185,129,0.45)';
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      <style>{`
        @keyframes chatsim-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes chatsim-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
};
