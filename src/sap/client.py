import time
import logging

logging.basicConfig(level=logging.INFO)

class SAPODataClient:
    def __init__(self, base_url: str, max_retries: int = 3):
        self.base_url = base_url
        self.max_retries = max_retries

    def send_procurement_payload(self, payload: dict) -> dict:
        """ارسال طلبات الشراء الى SAP مع دعم الـ Retry Engine للأخطاء 500"""
        for attempt in range(1, self.max_retries + 1):
            try:
                logging.info(f"[SAP Client] Sending payload (Attempt {attempt}): {payload['po_id']}")
                # محاكاة الاتصال المباشر بـ SAP OData Endpoint
                # في البيئة الحقيقية يتم استخدام requests.post
                success = True
                if success:
                    logging.info("[SAP Client] OData Request Successful - 201 Created")
                    return {"status": "SUCCESS", "sap_document_id": f"SAP-DOC-{payload['po_id']}"}
            except Exception as e:
                logging.error(f"[SAP Client] Error 500 detected on attempt {attempt}: {e}")
                time.sleep(2 ** attempt)  # Exponential Backoff
        
        return {"status": "FAILED", "error": "Max retries reached"}
