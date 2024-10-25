from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from app.models.inventory_ml import InventoryML
from typing import List, Dict
import json

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust according to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/predictions/demand")
async def get_demand_predictions() -> Dict[str, List[Dict[str, float]]]:
    # Load your demand predictions data (this should be a file or model)
    predictions = InventoryML().predict_demand()
    return {"predictions": predictions}

@app.get("/api/alerts/inventory")
async def get_inventory_alerts() -> Dict[str, List[Dict[str, int]]]:
    alerts = InventoryML().check_inventory_alerts()
    return {"alerts": alerts}

@app.get("/api/recommendations/{user_id}")
async def get_recommendations(user_id: str) -> Dict[str, List[str]]:
    recommendations = InventoryML().generate_recommendations(user_id)
    return {"recommendations": recommendations}
