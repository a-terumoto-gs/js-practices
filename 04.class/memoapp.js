import Enquirer from "enquirer";
import DB from "./db.js";

class MemoApp {
  constructor() {
    this.db = new DB("./memos.db");
    this.enquirer = new Enquirer();
  }

  async start() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
      await this.addMemo();
    } else if (args.includes("-l")) {
      await this.listMemos();
    } else if (args.includes("-r")) {
      await this.readMemo();
    } else if (args.includes("-d")) {
      await this.deleteMemo();
    } else {
      console.log("モードを選択してください");
    }
  }
  async addMemo() {
    const memoContent = await this.readStdin();

    if (!memoContent) {
      console.log("メモが入力されていません");
      process.exit(1);
    }

    this.db.addMemo(memoContent);
    console.log("メモが追加されました");
    console.log(memoContent);
  }

  async listMemos() {
    const memos = await this.db.listMemos();
    const choices = memos.map((memo) => memo.content.split("\n")[0]);

    console.log("メモ一覧:");
    choices.forEach((choice) => {
      console.log(choice);
    });
  }

  async readMemo() {
    const memos = await this.db.listMemos();
    const choices = memos.map((memo) => memo.content.split("\n")[0]);

    const { selectedMemo } = await this.enquirer.prompt({
      type: "select",
      name: "selectedMemo",
      message: "読みたいメモを選んでください",
      choices,
    });

    const selectedNote = memos.find(
      (memo) => memo.content.split("\n")[0] === selectedMemo,
    );
    if (selectedNote) {
      console.log(selectedNote.content);
    } else {
      console.log("選んだメモは存在しません");
    }
  }

  async deleteMemo() {
    const memos = await this.db.listMemos();
    const choices = memos.map((memo) => memo.content.split("\n")[0]);

    const { selectedMemo } = await this.enquirer.prompt({
      type: "select",
      name: "selectedMemo",
      message: "消したいメモを選んでください",
      choices,
    });

    const confirm = await this.enquirer.prompt({
      type: "confirm",
      name: "confirm",
      message: `"${selectedMemo}"を本当に消していいですか?`,
    });

    if (confirm) {
      const selectedNote = memos.find(
        (memo) => memo.content.split("\n")[0] === selectedMemo,
      );
      this.db.deleteMemo(selectedNote.id);
      console.log(`"${selectedMemo}"を削除しました`);
    } else {
      console.log("メモの削除がキャンセルされました");
    }
  }

  async readStdin() {
    return new Promise((resolve) => {
      let data = "";
      process.stdin.setEncoding("utf8");

      process.stdin.on("readable", () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
          data += chunk;
        }
      });

      process.stdin.on("end", () => {
        resolve(data.trim());
      });
    });
  }
}

const memo_app = new MemoApp();
memo_app.start();
