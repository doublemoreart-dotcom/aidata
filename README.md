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
node --test tests/site.test.mjs
```

正式網站目前由入口網站 repo 統一部署至 GitHub Pages；本 repo 是 AI Data 的獨立來源。同步自動化完成前，這裡的變更不會立即出現在正式網址。
