from src.engine.packaging import PackagingDecisionEngine
from src.sap.client import SAPODataClient

class AutonomousProcurementAgent:
    def __init__(self, sap_client: SAPODataClient):
        self.sap_client = sap_client
        self.engine = PackagingDecisionEngine()

    def process_order(self, order_id: str, weight_kg: float, fragility_limit_g: float):
        print(f"\n--- Processing Autonomous Order: {order_id} ---")
        
        # اتخاذ قرار التغليف الهيكلي
        specs = self.engine.evaluate_packaging_requirements(weight_kg, fragility_limit_g)
        print(f"[Agent Decision]: {specs}")

        # بناء Payload وتصديره لـ SAP S/4HANA
        payload = {
            "po_id": order_id,
            "material_spec": specs["recommended_flute"],
            "reinforcement": specs["reinforcement_strategy"],
            "cushioning_volume": specs["bio_foam_volume_cm3"]
        }

        # الإرسال عبر OData Client
        result = self.sap_client.send_procurement_payload(payload)
        print(f"[SAP Response]: {result}\n")
        return result

if __name__ == "__main__":
    sap = SAPODataClient(base_url="https://sap-s4hana.kvrat.ai/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV")
    agent = AutonomousProcurementAgent(sap_client=sap)
    
    # اختبار تشغيل المحرك
    agent.process_order(order_id="PO-99481", weight_kg=12.5, fragility_limit_g=30.0)
