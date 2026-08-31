import requests
import json

# ⚠️ 请务必替换为您新生成的 API Key！
API_KEY = "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"

response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        # OpenRouter 官方推荐加上这两个 header，有助于通过免费路由
        "HTTP-Referer": "http://localhost",
        "X-Title": "Local Python Test",
    },
    data=json.dumps({
        # 建议指定具体的免费模型，例如 "qwen/qwen-2.5-7b-instruct:free" 
        # "openrouter/free" 是自动路由，可能分配到不支持 reasoning 的模型
        "model": "openrouter/free", 
        "messages": [
            {
              "role": "user",
              "content": "How many r's are in the word 'strawberry'?"
            }
        ],
        "reasoning": {"enabled": True}
    })
)

# ==========================================
# 打印详细数据的 3 种方式
# ==========================================

# 方式 1：打印格式化的完整 JSON 数据（最推荐，结构清晰）
print("========== 完整 JSON 响应 ==========")
try:
    # 将响应内容解析为 Python 字典
    data = response.json()
    # 使用 json.dumps 格式化输出，indent=2 表示缩进 2 个空格，ensure_ascii=False 保证中文正常显示
    print(json.dumps(data, indent=2, ensure_ascii=False))
except requests.exceptions.JSONDecodeError:
    print("解析 JSON 失败，原始文本如下：")
    print(response.text)


# 方式 2：只提取 AI 的最终回复内容（日常使用最常用）
print("\n========== 提取的 AI 回复 ==========")
try:
    # OpenRouter 的返回结构遵循 OpenAI 格式
    ai_message = response.json()["choices"][0]["message"]["content"]
    print(ai_message)
except (KeyError, requests.exceptions.JSONDecodeError) as e:
    print(f"无法提取内容，错误: {e}")


# 方式 3：如果您想查看是否返回了 reasoning (思考过程) 细节
print("\n========== 检查 Reasoning 细节 ==========")
try:
    message_obj = response.json()["choices"][0]["message"]
    # 某些模型会将思考过程放在 provider 特定的字段中，或者 OpenRouter 会将其放在 content 的 <think> 标签内
    if "reasoning" in message_obj:
        print("包含 Reasoning 对象:", json.dumps(message_obj["reasoning"], indent=2))
    else:
        print("当前返回的模型可能不支持或未返回独立的 reasoning 字段。")
except Exception as e:
    print(f"检查失败: {e}")
    