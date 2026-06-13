import os
import json
import urllib.request

META_API_BASE = "https://graph.facebook.com/v18.0"

def fetch_insights(access_token: str, ad_account_id: str) -> list[dict]:
    url = (
        f"{META_API_BASE}/act_{ad_account_id}/insights"
        f"?fields=campaign_name,spend,impressions,clicks,actions"
        f"&level=campaign"
        f"&date_preset=last_7d"
        f"&access_token={access_token}"
    )
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
    campaigns = []
    for row in data.get("data", []):
        actions = row.get("actions", [])
        purchases = 0
        purchase_value = 0.0
        for a in actions:
            if a.get("action_type") == "purchase":
                purchases = int(a.get("value", 0))
            if a.get("action_type") == "purchase_value":
                purchase_value = float(a.get("value", 0))
        campaigns.append({
            "nome": row.get("campaign_name", "desconhecida"),
            "canal": "Meta Ads",
            "investimento": float(row.get("spend", 0)),
            "impressoes": int(row.get("impressions", 0)),
            "cliques": int(row.get("clicks", 0)),
            "compras": purchases,
            "receita": purchase_value,
        })
    return campaigns


def main():
    token = os.environ.get("META_ACCESS_TOKEN", "")
    account = os.environ.get("META_AD_ACCOUNT_ID", "")
    if not token or not account:
        print("META_ACCESS_TOKEN e META_AD_ACCOUNT_ID são obrigatórios")
        return
    dados = fetch_insights(token, account)
    print(json.dumps(dados, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
