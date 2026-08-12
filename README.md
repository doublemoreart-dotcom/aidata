# AI Data

AI 產業滲透率、公司估值與產業影響的資料觀察網站。

- 正式網址：https://dinopeng.com/aidata/
- 入口網站：https://dinopeng.com/

## 專案結構

- `index.html`：完整單頁網站，包含樣式、資料與互動程式
- `assets/company-logos/`：公司識別圖示
- `tests/site.test.mjs`：靜態結構與部署路徑的基本驗證

## 本機檢視

以任一靜態檔案伺服器開啟 repo 根目錄，例如：

```bash
python3 -m http.server 8000
```

接著開啟 `http://localhost:8000/`。

## 驗證

```bash
npm test
```

CI 會在 push 與 pull request 時執行相同測試，包含版本日期、來源查核日、相對資源、inline JavaScript 與 GA4 防重複檢查。

## 發佈關係

正式網站由入口網站 repo 統一部署至 GitHub Pages；本 repo 是 AI Data 的獨立來源。每小時的同步工作會將本 repo 的 `index.html` 與 `assets/` 複製到入口 repo 的 `aidata/`。

- 網頁、資料與 GA4 變更必須先維護在本 repo。
- 入口 repo 的 `aidata/` 是部署快照，不是主要編輯來源。
- 本 repo 不放 `CNAME`；`dinopeng.com` 由入口 repo 管理。

## 安全退版

Push 被拒絕或網路中斷時，遠端不會產生半個 commit，修正後重新 push 即可。若變更已推送且發布後發現問題，使用反向 commit 保留歷史：

```bash
git fetch origin
git switch main
git pull --ff-only
git revert <bad_commit_sha>
npm test
git push origin main
```

退版 push 成功後，入口 repo 會在下一次自動同步回復正式網站；也可在入口 repo 手動執行 `Sync project sites` workflow 加速回復。
