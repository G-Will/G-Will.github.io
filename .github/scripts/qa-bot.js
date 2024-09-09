const { Octokit } = require("@octokit/rest");
const axios = require("axios");
const { handleStream } = require("./handle-stream");

// 从环境变量中获取GitHub Token和Bot API Key
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const BOT_API_KEY = process.env.BOT_API_KEY;

// 初始化Octokit实例
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// 处理新issue的函数
async function handleNewIssue(owner, repo, issueNumber) {
  try {
    // 获取issue的详细信息
    const { data: issue } = await octokit.issues.get({
      owner,
      repo,
      issue_number: issueNumber,
    });

    const issueTitle = issue.title;
    const issueBody = issue.body;

    // 1f484875-59ac-4a85-80db-716b1367f2ee

    // 调用Q&A机器人API生成回答
    /* const response = await axios.post(
      `https://api.petercat.ai/api/bot/${BOT_API_KEY}/generate-answer`,
      {
        title: issueTitle,
        body: issueBody,
      },
      {
        headers: {
          Authorization: `Bearer ${BOT_API_KEY}`,
        },
      }
    );

    const botAnswer = response.data.answer; */

    const response = await axios.post(
      `https://api.petercat.ai/api/chat/stream_qa`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          connection: "keep-alive",
          "keep-alive": "timeout=5",
          Authorization: `Bearer ${BOT_API_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: issueTitle,
                },
                {
                  type: "text",
                  text: issueBody,
                },
              ],
            },
          ],
          bot_id: BOT_API_KEY,
        }),
      }
    );

    // 在issue中添加评论
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body: handleStream(response),
    });

    console.log(`Successfully commented on issue #${issueNumber}`);
  } catch (error) {
    console.error(`Error handling issue #${issueNumber}:`, error);
  }
}

// 从环境变量中获取仓库信息
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = process.env.GITHUB_REPOSITORY_NAME;
const issueNumber = process.env.GITHUB_ISSUE_NUMBER;

// 处理新issue
handleNewIssue(owner, repo, issueNumber);
