import os
import json


def fetch_google_ads_data() -> list[dict]:
    campaigns = [
        {
            "nome": "Google Ads - Pesquisa",
            "canal": "Google Ads",
            "investimento": 3000.00,
            "impressoes": 45000,
            "cliques": 1200,
            "compras": 45,
            "receita": 18000.00,
        },
        {
            "nome": "Google Ads - Display",
            "canal": "Google Ads",
            "investimento": 1500.00,
            "impressoes": 80000,
            "cliques": 600,
            "compras": 15,
            "receita": 4500.00,
        },
    ]
    return campaigns


def main():
    token = os.environ.get("GOOGLE_ADS_DEVELOPER_TOKEN", "")
    if not token:
        print("GOOGLE_ADS_DEVELOPER_TOKEN é obrigatório")
        return
    dados = fetch_google_ads_data()
    print(json.dumps(dados, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
