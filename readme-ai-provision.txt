

#1. openrouter(https://openrouter.ai/)
【Free model]
https://openrouter.ai/models?spm=a2ty_o01.29997172.0.0.737b55fbJXvjAR&order=newest&max_price=0


[API Key]
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

[Typescript]
fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer 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',
    'HTTP-Referer': '<YOUR_SITE_URL>',
    'X-Title': '<YOUR_SITE_NAME>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openai/gpt-4o',
    messages: [
      {
        role: 'user',
        content: 'What is the meaning of life?',
      },
    ],
  }),
});


[REST API]
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
  "model": "openai/gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": "What is the meaning of life?"
    }
  ]
}'


[web - 事件分析]
function startEventAnalysis() {
  const dialog = DialogPlugin.confirm({
    header: $t("workbench.novel.msg.eventAnalysisHeader"),
    body: $t("workbench.novel.msg.eventAnalysisBody", { count: selectedRowKeys.value.length }),
    onConfirm: () => {
      dialog.destroy();
      axios
        .post("/novel/event/generateEvents", {
          projectId: project.value?.id!,
          novelIds: selectedRowKeys.value,
          concurrentCount: otherSetting.value.assetsBatchGenereateSize,
        })
        .then((res) => {
          selectedRowKeys.value.length = 0;
          getNovel();
        });
    },
  });
}