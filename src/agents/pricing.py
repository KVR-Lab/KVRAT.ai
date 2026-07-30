class DynamicPricingAgent:
    def calculate_cost(self, packaging_specs: dict) -> dict:
        """حساب التكلفة الإجمالية والوفر الناتج عن تقليل وزن الخامات"""
        base_material_cost = 15.0  # تكلفة افتراضية
        
        # تطبيق الخصم بناءً على وفر الوزن 18%
        if "18% weight reduction" in packaging_specs.get("weight_savings", ""):
            unit_cost = base_material_cost * 0.82
            savings_note = "18% cost reduction applied"
        else:
            unit_cost = base_material_cost
            savings_note = "Standard pricing applied"
            
        cushioning_cost = packaging_specs.get("bio_foam_volume_cm3", 0) * 0.01
        total_cost = round(unit_cost + cushioning_cost, 2)
        
        return {
            "unit_cost_usd": total_cost,
            "savings_status": savings_note
        }
