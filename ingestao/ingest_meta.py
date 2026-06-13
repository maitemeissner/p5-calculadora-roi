import os, json, urllib.request

API_URL = os.getenv('API_URL', 'http://localhost:8787')

def ingest():
    data = json.dumps({
        "budget": 8000,
        "campanhas": [
            {"nome": "Meta Ads Q2", "plataforma": "Meta Ads", "investimento": 6000, "roas": 3.8, "status": "ativa"},
            {"nome": "Retargeting Meta", "plataforma": "Meta Ads", "investimento": 3000, "roas": 4.5, "status": "ativa"}
        ]
    }).encode()

    req = urllib.request.Request(f"{API_URL}/api/campanhas", data=data, headers={"Content-Type": "application/json"}, method="POST")
    resp = urllib.request.urlopen(req)
    print(f"Ingestão concluída: {resp.status}")

if __name__ == "__main__":
    ingest()