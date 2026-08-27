[https://github.com/HBAI-Ltd/Toonflow-app]


[Download txt]
https://wap.baoshu2.com/down/d5t54740baoshu.html

node, npm, yarn


Toonflow项目包含前端和后端代码
[前端]https://github.com/HBAI-Ltd/Toonflow-web.git
yarn install
yarn dev
# 开发环境构建
yarn build:dev
# 生产环境构建
yarn build:prod

构建产物将输出到 dist 目录。



[后端]https://github.com/HBAI-Ltd/Toonflow-app.git

[Dev running]
启动开发环境
# 1. 国内克隆
git clone https://gitee.com/HBAI-Ltd/Toonflow-app.git
          https://github.com/HBAI-Ltd/Toonflow-app.git
cd Toonflow-app
yarn install

# 仅启动后端API
yarn dev

[[
# 启动Electron桌面开发窗口（推荐完整调试）
yarn dev:gui
# 编译TS生产代码
yarn build
# 打包Windows桌面安装包
yarn dist:win
]]

//////////////////////////////////
[Uninstall ollama]
#1 停止&关闭开机自启
sudo systemctl stop ollama
sudo systemctl disable ollama

#2 删除systemd服务
sudo rm -f /etc/systemd/system/ollama.service
sudo systemctl daemon-reload

#3 删除主程序二进制
sudo rm $(which ollama)

#4 删除系统目录、ollama系统用户
sudo rm -rf /usr/share/ollama
sudo userdel ollama
sudo groupdel ollama

#5 删除当前用户下载的模型（重要）
rm -rf ~/.ollama

/////////////////////////////////
Ollama 只负责跑文本大模型（LLM），它本身不能跑视频生成模型。

[Install ollama]
curl -fsSL https://ollama.com/install.sh | sh

[访问 Ollama 模型库]
https://ollama.ai/library

安装完成，Ollama 会后台自动启动服务，默认地址：http://localhost:11434
打开 PowerShell / 终端，验证安装：ollama --version


[拉取模型]
[访问 Ollama 模型库]：看支持了哪些模型
https://ollama.ai/library

#拉取适合 Toonflow 的本地模型
》》Ollama 本地运行 deepseek‑r1 /deepseek‑v3 模型：不用官网的 DeepSeek API Key，模型已经下载到本地显卡运行，不走 DeepSeek 云端。
》》如果你直接调用 DeepSeek 官方云端 https://api.deepseek.com/v1：才必须申请官网真实 API‑Key。


# 中文综合最强，剧本、小说解析优先推荐
ollama pull qwen3.6:8b

#ollama pull qwen3.6:27b

# 推理更强，剧情拆解、逻辑，需要更高内存显存
# ollama pull deepseek‑r1:14b

[下载完成后测试模型是否正常运行：]
ollama run qwen3.6:8b

>ollama run qwen3.6:27b

[查看已下载模型]
ollama list

[删除单个模型]
ollama rm 模型名:标签


[测试]
输入一句话测试输出，确认正常，退出输入/bye。
Ollama 自带 OpenAI 兼容地址：http://localhost:11434/v1，不需要 key，密钥随便填写字符串。

////////////////////////////////////////////////////////////////////////////////////////////
Toonflow‑app 配置 Ollama 本地模型
1. 登录 Toonflow（默认账号admin，密码admin123）GitHub
2. 侧边栏打开：设置 → AI 模型服务 → 新增文本模型 →【自定义 OpenAI 兼容】
3. 填写参数，直接复制下面：
服务名称：Ollama‑Local（随便命名）
BaseURL：http://localhost:11434/v1
API Key：sk‑dummy‑local（随便填字符串，Ollama 不校验 key）
模型名称：qwen3.6:8b（和你 ollama pull 下载的模型名字完全一致！大小写、冒号不能错）
4. 点击验证连接，显示连接成功；保存配置。
❗坑点：模型名必须和ollama list输出完全一致，写错会报错找不到模型。执行ollama list查看本机模型真实名称。
步骤 4：给 Agent 分配本地模型
Toonflow 每个智能体（小说解析 Agent、剧本生成 Agent、分镜提示词 Agent）都可以独立设置模型：
1. 进入项目，打开 Agent 配置
2. 模型供应商选择刚才新增的Ollama‑Local
3. 模型选择：qwen3.6:8b，保存。
测试
新建一个简单小说片段，执行解析→生成剧本。
如果一直转圈：
1. 确认任务管理器 Ollama 进程在运行；
2. 浏览器访问 http://localhost:11434/v1/models，能返回 JSON 代表 Ollama 服务正常；
3. 检查模型名字是否复制完全，不要漏:8b；
4. 本地 CPU 跑 8B 速度慢，耐心等待，优先使用 N 卡 GPU 加速。


////////////////////////////////////////////////////////
curl http://127.0.0.1:11434/v1/chat/completions 
  -Method Post `
  -Headers @{"Content‑Type"="application/json";"Authorization"="Bearer ollama"} `
  -Body '{"model":"qwen3:8b","messages":[{"role":"user","content":"hi"}]}'
  
  
curl -X POST http://127.0.0.1:11434/v1/chat/completions -H 'Content‑Type=application/json;Authorization=Bearer ollama;' -d '{"model":"qwen3.6:27b","messages":[{"role":"user","content":"hi"}]}'

///////////////////////////////////////////////////////
[加载模型]
curl -X POST http://localhost:11434/api/load -d '{"model": "模型名称"}' -H "Content-Type: application/json"

[运行模型并获取响应]
curl -X POST http://localhost:11434/api/generate -d '{"prompt": "你的提示信息", "model": "模型名称"}' -H "Content-Type: application/json"

[示例：加载 llama 并生成文本]
# 加载模型
curl -X POST http://localhost:11434/api/load -d '{"model": "llama:ggml-gpt4all-j"}' -H "Content-Type: application/json"

# 生成文本
curl -X POST http://localhost:11434/api/generate -d '{"prompt": "Hello, how are you?", "model": "llama:ggml-gpt4all-j"}' -H "Content-Type: application/json"

[查看可用模型和状态]
curl http://localhost:11434/api/list

[卸载模型]
curl -X POST http://localhost:11434/api/unload -d '{"model": "模型名称"}' -H "Content-Type: application/json"

[example 1]
curl http://localhost:11434/api/generate -d '{"model": "qwen3:8b","prompt": "Why is the sky blue?"}'

curl http://localhost:11434/api/generate -d '{"model": "qwen3.6:27b","prompt": "Who are you?"}'

remote:
curl http://10.70.128.16:11434/api/generate -d '{"model": "qwen3:8b","prompt": "Who are you?"}'
curl http://10.70.128.16:11434/api/generate -d '{"model": "qwen3:8b","prompt": "Who are you?", "stream":false}'
{
  "model": "qwen3:8b",
  "created_at": "2026-08-14T07:10:50.38536447Z",
  "response": "I am Qwen, a large language model developed by Alibaba Cloud. My purpose is to assist with a wide range of tasks, such as answering questions, creating content, providing explanations, and engaging in conversations. I can help with topics like technology, culture, science, and more. Let me know how I can assist you! 😊",
  "thinking": "Okay, the user is asking, \"Who are you?\" I need to explain my identity clearly. First, I should mention my name, Qwen, and my role as a large language model developed by Alibaba Cloud. It's important to highlight my capabilities, like understanding and generating text across various topics. I should also note that I can engage in conversations, answer questions, and assist with tasks. But I should keep it concise and avoid technical jargon. Let me structure the response to cover my purpose, functions, and how I can help the user. Make sure to invite them to ask questions or request assistance. Let me check if there's anything else I need to include, like my training data or specific features. No, the user just wants to know who I am, so keep it focused on my role and abilities. Alright, time to put that together in a friendly and informative way.\n",
  "done": true,
  "done_reason": "stop",
  "context": [151644, 872, 198, 15191, 525, 498, 30, 608, 26865, 151645, 198, 151644, 77091, 198, 151667, 198, 32313, 11, 279, 1196, 374, 10161, 11, 330, 15191, 525, 498, 7521, 358, 1184, 311, 10339, 847, 9569, 9355, 13, 5512, 11, 358, 1265, 6286, 847, 829, 11, 1207, 16948, 11, 323, 847, 3476, 438, 264, 3460, 4128, 1614, 7881, 553, 54364, 14817, 13, 1084, 594, 2989, 311, 11167, 847, 16928, 11, 1075, 8660, 323, 23163, 1467, 3941, 5257, 13347, 13, 358, 1265, 1083, 5185, 429, 358, 646, 16579, 304, 20959, 11, 4226, 4755, 11, 323, 7789, 448, 9079, 13, 1988, 358, 1265, 2506, 432, 63594, 323, 5648, 10916, 502, 70821, 13, 6771, 752, 5944, 279, 2033, 311, 3421, 847, 7428, 11, 5746, 11, 323, 1246, 358, 646, 1492, 279, 1196, 13, 7405, 2704, 311, 21399, 1105, 311, 2548, 4755, 476, 1681, 12994, 13, 6771, 752, 1779, 421, 1052, 594, 4113, 770, 358, 1184, 311, 2924, 11, 1075, 847, 4862, 821, 476, 3151, 4419, 13, 2308, 11, 279, 1196, 1101, 6801, 311, 1414, 879, 358, 1079, 11, 773, 2506, 432, 10735, 389, 847, 3476, 323, 17541, 13, 97593, 11, 882, 311, 2182, 429, 3786, 304, 264, 11657, 323, 38219, 1616, 624, 151668, 271, 40, 1079, 1207, 16948, 11, 264, 3460, 4128, 1614, 7881, 553, 54364, 14817, 13, 3017, 7428, 374, 311, 7789, 448, 264, 6884, 2088, 315, 9079, 11, 1741, 438, 35764, 4755, 11, 6825, 2213, 11, 8241, 40841, 11, 323, 22570, 304, 20959, 13, 358, 646, 1492, 448, 13347, 1075, 5440, 11, 7674, 11, 8038, 11, 323, 803, 13, 6771, 752, 1414, 1246, 358, 646, 7789, 498, 0, 26525, 232],
  "total_duration": 61501574570,
  "load_duration": 403223694,
  "prompt_eval_count": 14,
  "prompt_eval_duration": 232295000,
  "eval_count": 254,
  "eval_duration": 60849950000
}


casa@vccap-164:~/setup$ curl http://10.70.128.16:11434/api/generate -d '{"model": "qwen3:8b","prompt": "Who are you?", "stream":false}'
{"model":"qwen3:8b","created_at":"2026-08-14T07:10:50.38536447Z","response":"I am Qwen, a large language model developed by Alibaba Cloud. My purpose is to assist with a wide range of tasks, such as answering questions, creating content, providing explanations, and engaging in conversations. I can help with topics like technology, culture, science, and more. Let me know how I can assist you! 😊","thinking":"Okay, the user is asking, \"Who are you?\" I need to explain my identity clearly. First, I should mention my name, Qwen, and my role as a large language model developed by Alibaba Cloud. It's important to highlight my capabilities, like understanding and generating text across various topics. I should also note that I can engage in conversations, answer questions, and assist with tasks. But I should keep it concise and avoid technical jargon. Let me structure the response to cover my purpose, functions, and how I can help the user. Make sure to invite them to ask questions or request assistance. Let me check if there's anything else I need to include, like my training data or specific features. No, the user just wants to know who I am, so keep it focused on my role and abilities. Alright, time to put that together in a friendly and informative way.\n","done":true,"done_reason":"stop","context":[151644,872,198,15191,525,498,30,608,26865,151645,198,151644,77091,198,151667,198,32313,11,279,1196,374,10161,11,330,15191,525,498,7521,358,1184,311,10339,847,9569,9355,13,5512,11,358,1265,6286,847,829,11,1207,16948,11,323,847,3476,438,264,3460,4128,1614,7881,553,54364,14817,13,1084,594,2989,311,11167,847,16928,11,1075,8660,323,23163,1467,3941,5257,13347,13,358,1265,1083,5185,429,358,646,16579,304,20959,11,4226,4755,11,323,7789,448,9079,13,1988,358,1265,2506,432,63594,323,5648,10916,502,70821,13,6771,752,5944,279,2033,311,3421,847,7428,11,5746,11,323,1246,358,646,1492,279,1196,13,7405,2704,311,21399,1105,311,2548,4755,476,1681,12994,13,6771,752,1779,421,1052,594,4113,770,358,1184,311,2924,11,1075,847,4862,821,476,3151,4419,13,2308,11,279,1196,1101,6801,311,1414,879,358,1079,11,773,2506,432,10735,389,847,3476,323,17541,13,97593,11,882,311,2182,429,3786,304,264,11657,323,38219,1616,624,151668,271,40,1079,1207,16948,11,264,3460,4128,1614,7881,553,54364,14817,13,3017,7428,374,311,7789,448,264,6884,2088,315,9079,11,1741,438,35764,4755,11,6825,2213,11,8241,40841,11,323,22570,304,20959,13,358,646,1492,448,13347,1075,5440,11,7674,11,8038,11,323,803,13,6771,752,1414,1246,358,646,7789,498,0,26525,232],"total_duration":61501574570,"load_duration":403223694,"prompt_eval_count":14,"prompt_eval_duration":232295000,"eval_count":254,"eval_duration":60849950000}casa@vccap-164:~/setup$ 
curl http://10.70.128.16:11434/api/generate -d '{"model": "qwen3.6:27b","prompt": "Who are you?"}'


/////
curl http://127.0.0.1:11434/api/tags | jq
curl http://10.70.128.16:11434/api/tags | jq

//////////////////////////////////////////////////////////////
Ollama 提供的是一个本地 HTTP REST API 服务，默认监听： 
http://localhost:11434

[远程访问]
修改/etc/systemd/system/ollama.service, 添加下面环境变量
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=*"

# systemctl daemon-reload
# systemctl restart ollama

# netstat -naop | grep 11434
tcp6       0      0 :::11434                :::*                    LISTEN      84774/ollama         off (0.00/0/0)

# curl http://10.70.128.16:11434/api/tags 
{"models":[{"name":"qwen3:8b","model":"qwen3:8b","modified_at":"2026-08-14T06:45:11.29431891Z","size":5225388164,"digest":"500a1f067a9f782620b40bee6f7b0c89e17ae61f686b92c24933e4ca4b2b8b41","details":{"parent_model":"","format":"gguf","family":"qwen3","families":["qwen3"],"parameter_size":"8.2B","quantization_level":"Q4_K_M","context_length":40960,"embedding_length":4096},"capabilities":["completion","tools","thinking"]},{"name":"qwen3.6:27b","model":"qwen3.6:27b","modified_at":"2026-08-14T06:15:58.262334262Z","size":17420432739,"digest":"a50eda8ed977ab48a12431878896b27ffd5cef552c17af3317d9623b939a7f1e","details":{"parent_model":"","format":"gguf","family":"qwen35","families":["qwen35"],"parameter_size":"27.8B","quantization_level":"Q4_K_M","context_length":262144,"embedding_length":5120},"capabilities":["vision","completion","tools","thinking"]}]}



主要分为 模型推理接口 和 模型管理接口 两大类。

#1. 文本生成接口:单轮文本生成。
http://localhost:11434/api/generate

用途：
#1.1 文本续写
#1.2 问答
#1.3 代码生成
#1.4 单轮推理

常用参数：
{
  "model": "llama3",
  "prompt": "Hello",
  "stream": false,
  "system": "你是一名Linux专家",
  "temperature": 0.3
}

Example:
curl http://localhost:11434/api/generate \
-d '{
  "model": "llama3",
  "prompt": "介绍一下Linux"
}'

#2. Chat 接口:类似 OpenAI ChatCompletion
http://localhost:11434/api/chat

支持：
#2.1 多轮对话
#2.2 Tool Call
#2.3 图片输入
#2.4 Thinking 模式
#2.5 JSON输出

Example:
curl http://localhost:11434/api/chat \
-d '{
  "model":"llama3",
  "messages":[
    {
      "role":"user",
      "content":"什么是MIPS ABI？"
    }
  ]
}'

返回：
{
  "message": {
    "role": "assistant",
    "content": "..."
  }
}

#3. Embedding 接口
生成向量。
http://localhost:11434/api/embed

用途：
#3.1 RAG
#3.2 向量检索
#3.3 知识库

Example:
curl http://localhost:11434/api/embed \
-d '{
  "model":"nomic-embed-text",
  "input":"Linux kernel"
}'

返回：
{
  "embeddings":[
      [...]
  ]
}

#4. 模型下载:/api/pull
#5. 模型创建:/api/create
#6. 删除模型: /api/delete
#7. 


///////////////////////////////////////////////////////////
curl http://10.70.128.16:11434/v1/chat/completions -d '{"model":"qwen3:8b","messages":[{"content":"Who are you?"}]}'

Toolflow-app填入API：http://10.70.128.16:11434/v1，自动补全/chat/completions



视频模型	Seedance 2.0
图片模型	GPT Image 2
语言模型	Claude Opus 4.6

///////////////////////////////////
参数	        Ollama 本地示例	                  硅基流动云端示例
模型名称	   qwen3:8b	                    Qwen/Qwen3‑8B‑Instruct
Base URL	http://127.0.0.1:11434/v1	 https://api.siliconflow.cn/v1
API Key	    ollama（占位）	                   粘贴你平台申请的真实 sk‑xxx


siliconflow 有免费llm，视频不免费

///////////////////////////////////////////////////////////////////////////



>>> 有没有可以本地部署的免费的图像/视频llm
... 
... 
Thinking...
好的，用户现在问有没有可以本地部署的免费图像/视频LLM。之前他们问过云端的免费模型，现在转向本地部署，可能是因为他们希望更灵活或者有隐私考虑。需要明确本地部署和云端的不同，比如需要自己安
装环境，可能需要一定的技术基础。

首先，得区分图像和视频生成模型，用户可能对两者都需要，所以要分别列出。然后，本地部署的模型通常需要下载模型文件，可能需要较大的存储空间，比如Stable Diffusion的模型文件可能有几十GB，用户
需要确保有足够空间。

接下来，考虑哪些模型是开源且免费的，比如Stable Diffusion、DALL·E Mini、Runway ML的本地版本等。还要提到一些工具或平台，比如ComfyUI、WebUI，这些可以帮助用户更容易地部署模型。

另外，用户可能对如何部署不太熟悉，所以需要给出步骤，比如下载模型、安装依赖、运行代码等。同时，提醒用户注意硬件要求，比如GPU加速，否则可能运行缓慢。

还要考虑用户是否有技术背景，是否需要更详细的指导，比如如何设置环境变量或者处理依赖问题。可能还需要推荐一些社区资源，比如GitHub仓库或论坛，供用户获取帮助。

另外，视频生成模型可能比较少，需要特别指出，比如Pika Labs的本地部署选项，或者Synthia这样的开源项目。同时，提醒用户本地部署可能需要更多的计算资源，特别是处理视频时，可能需要高性能的GPU。


最后，确保回答清晰，分点列出，方便用户查找所需信息，并给出实用建议，比如推荐适合新手的工具或资源，帮助他们顺利部署。
...done thinking.

对于本地部署的免费图像/视频生成模型（LLM），以下是一些主流且开源的工具和框架，适合在本地服务器、PC 或云服务器（如 AWS EC2、Google Colab）上运行。这些模型通常需要一定的计算资源（如 GPU）
，但可以完全控制数据隐私和部署环境。

---

### **一、图像生成模型（本地部署）**
#### 1. **Stable Diffusion（开源）**
   - **特点**：
     - 完全开源，支持多种版本（如 SD 1.4、SDXL、Stable Diffusion 3）。
     - 支持文本生成图像、图像编辑、图像到图像等任务。
     - 可通过 WebUI、ComfyUI 等工具本地部署。
   - **本地部署方式**：
     - **WebUI**：使用 [Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)（推荐）。
       - 下载并运行 WebUI，上传模型文件（如 `sd1.4.ckpt`）。
       - 支持 GPU 加速（推荐使用 CUDA 环境）。
     - **ComfyUI**：通过节点式流程进行图像生成，适合复杂工作流。
       - 官网：[ComfyUI](https://github.com/comfyanonymous/ComfyUI)
   - **模型文件**：
     - 可从 [Hugging Face](https://huggingface.co/models?pipeline_tag=image-to-image&sort=downloads) 或 [ModelScope](https://modelscope.cn/models) 下载。
     - 部分模型文件（如 SD 1.4）约 1.5GB，SDXL 可达 10GB 以上。

#### 2. **DALL·E Mini（开源）**
   - **特点**：
     - 基于 DALL·E 的轻量级模型，支持文本生成图像。
     - 支持本地部署（需 Python 环境）。
   - **本地部署方式**：
     - 使用 [DALL·E Mini](https://github.com/leeping/dalle-mini) 项目。
       - 安装依赖（如 PyTorch、transformers）。
       - 下载模型文件（如 `dalle-mini-1.0.pth`），运行代码生成图像。
     - **注意**：模型性能可能不如 Stable Diffusion。

#### 3. **Runway ML（本地部署）**
   - **特点**：
     - 提供图像生成工具（如 "Runway ML Image Generator"）。
     - 支持本地部署（需 Python 环境）。
   - **本地部署方式**：
     - 使用 [Runway ML API](https://runwayml.com/) 的本地适配版本（需查看具体文档）。
     - 部分功能可能需要付费解锁，但基础功能可免费使用。

---

### **二、视频生成模型（本地部署）**
#### 1. **Pika Labs（开源）**
   - **特点**：
     - 专注于视频生成的模型（如 Pika 1.0、Pika 2.0）。
     - 支持文本生成视频，但本地部署可能需要较高算力。
   - **本地部署方式**：
     - 使用 [Pika Labs GitHub 仓库](https://github.com/pikalabs/pika)。
     - 需要 Python 环境和 GPU 支持，部分模型文件较大（如 10GB+）。

#### 2. **Synthia（开源）**
   - **特点**：
     - 开源的视频生成工具，支持生成逼真的视频片段。
     - 适合技术用户，需自行部署。
   - **本地部署方式**：
     - 从 [Synthia GitHub](https://github.com/yourname/synthia) 下载代码。
     - 安装依赖（如 PyTorch、OpenCV）并运行。

#### 3. **Runway ML Video Generator（本地部署）**
   - **特点**：
     - 支持文本生成视频，提供本地部署选项。
     - 需要 Python 环境和 GPU 支持。
   - **本地部署方式**：
     - 参考 [Runway ML 文档](https://runwayml.com/) 的本地部署指南。

---

### **三、综合部署工具（支持图像/视频生成）**
#### 1. **Hugging Face Transformers（本地部署）**
   - **特点**：
     - 提供大量开源模型（如 Stable Diffusion、DALL·E Mini 等）。
     - 支持本地运行（需 Python 环境和 GPU）。
   - **使用方式**：
     - 安装 `transformers` 和 `diffusers` 库。
     - 下载模型文件并运行代码生成图像或视频。
     - 示例代码：
       ```python
       from diffusers import StableDiffusionPipeline
       import torch

       model_id = "stabilityai/stable-diffusion-2-1"
       pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
       pipe = pipe.to("cuda")
       image = pipe("A futuristic city at night").images[0]
       image.save("generated_image.png")
       ```

#### 2. **Google Colab（本地部署）**
   - **特点**：
     - 提供免费 GPU 资源，适合快速测试模型。
     - 可直接运行代码生成图像或视频。
   - **使用方式**：
     - 在 [Google Colab](https://colab.research.google.com/) 中运行代码。
     - 示例：运行 Stable Diffusion 的 WebUI 或直接调用模型 API。

---

### **四、硬件与环境要求**
| 模型类型 | 推荐硬件 | 说明 |
|----------|----------|------|
| **图像生成** | GPU（NVIDIA 1080/2080/3090） | 加速生成速度，避免 CPU 超载。 |
| **视频生成** | GPU（NVIDIA A100/RTX 3090） | 视频生成对显存和算力要求更高。 |
| **本地部署** | Python 3.8+ | 需安装依赖库（如 PyTorch、transformers）。 |

---

### **五、免费资源推荐**
1. **模型文件下载**：
   - [Hugging Face Models](https://huggingface.co/models)（搜索 "image-to-image" 或 "video-generation"）。
   - [ModelScope](https://modelscope.cn/models)（阿里开源模型库）。
2. **部署工具**：
   - [Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)（推荐）。
   - [ComfyUI](https://github.com/comfyanonymous/ComfyUI)（节点式工作流）。
3. **社区支持**：
   - [Stable Diffusion Discord](https://discord.gg/6U4Dn5W)。
   - [Runway ML Forum](https://runwayml.com/community)。

---

### **六、注意事项**
1. **模型文件大小**：部分模型（如 SDXL）可能需要几十 GB 存储空间。
2. **依赖安装**：确保 Python 环境已安装 PyTorch、transformers 等库。
3. **隐私安全**：本地部署可避免数据上传云端，适合敏感内容生成。
4. **性能优化**：使用 GPU 加速生成速度，避免 CPU 慢速运行。


//////////////////////////////////////////////////////////////////////////////////

由于您本地没有 GPU，且正在研究 Toonflow，如果您想实现 “零成本”或“极低成本”跑通整条短剧流水线，建议采用以下 “半自动组合拳”：
剧本与分镜（文本 LLM）：对接 硅基流动 或 阿里百炼 的免费开源大模型 API（如 Qwen2.5-7B）。
角色与分镜图（图像生成）：在 Toonflow 设置中对接 硅基流动 的 FLUX 或 SD 免费 API，实现自动化批量出图。
视频生成（图生视频）：放弃在 Toonflow 中自动调用视频 API（因为免费额度太少，且后续必须花钱）。

正确做法：让 Toonflow 自动跑完“剧本->分镜->生成图片”的步骤。然后您将生成的图片下载下来，手动上传到 可灵 AI 或 即梦 的网页端，利用每天的免费签到积分进行“图生视频”。


==============================================
https://github.com/sin0235/Toonflow-web.git

