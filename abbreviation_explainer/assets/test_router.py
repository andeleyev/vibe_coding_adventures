from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
)

res = client.chat.completions.create(
    model="google/gemma-3n-e4b-it:free",
    messages=[{"role": "user", "content": "Hello!"}]
)

print(res)
