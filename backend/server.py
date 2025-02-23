#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Feb 21 10:26:08 2025

@author: moradbelmelih
"""

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import subprocess
import os

app = FastAPI()

# Modèle de données pour la requête
class CVData(BaseModel):
    sentence: str

TEMPLATE_PATH = "template.tex"
OUTPUT_PDF = "generated_cv.pdf"
OUTPUT_TEX = "generated_cv.tex"

def generate_latex(cv_data: CVData):
    """Remplace le placeholder dans le fichier LaTeX par la phrase donnée."""
    with open(TEMPLATE_PATH, "r") as file:
        latex_template = file.read()

    # Remplacement du placeholder
    latex_filled = latex_template.replace("{{PLACEHOLDER}}", cv_data.sentence)

    with open(OUTPUT_TEX, "w") as file:
        file.write(latex_filled)

def compile_latex():
    """Compile le fichier LaTeX en PDF en utilisant pdflatex."""
    try:
        subprocess.run(["pdflatex", "-interaction=nonstopmode", OUTPUT_TEX], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la compilation LaTeX: {e.stderr.decode()}")

@app.post("/generate-cv")
async def generate_cv(cv_data: CVData):
    """Endpoint pour générer un PDF à partir de LaTeX."""
    try:
        generate_latex(cv_data)
        compile_latex()
        
        if not os.path.exists(OUTPUT_PDF):
            raise HTTPException(status_code=500, detail="Échec de la génération du fichier PDF.")

        return {"message": "CV généré avec succès", "pdf_url": f"/download/{OUTPUT_PDF}"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{filename}")
async def download_cv(filename: str):
    """Endpoint pour télécharger le CV généré."""
    file_path = os.path.abspath(filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Fichier non trouvé.")

    return FileResponse(file_path, media_type="application/pdf", filename=filename)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    

