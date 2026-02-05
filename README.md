# 健康飲食 Healthy Diet

健康食品線上訂購系統，提供完整的前台購物流程與後台管理介面。

> **Demo**：https://physicx594.github.io/healthy-diet-vue3/

## 功能特色

### 前台（顧客端）

- 商品瀏覽：首頁輪播推薦、商品列表分頁、單一商品詳情
- 購物車：新增 / 修改數量 / 刪除商品、套用優惠券
- 結帳流程：填寫訂購資訊 → 確認付款 → 完成訂單
- 滿 3,000 元免運費

### 後台（管理端）

- 登入驗證與 token 管理
- 商品管理（CRUD、圖片上傳）
- 訂單管理
- 優惠券管理

## 技術棧

| 類別 | 技術 |
| --- | --- |
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 語言 | TypeScript |
| 建置工具 | Vite |
| 路由 | Vue Router 4（Hash Mode） |
| 狀態管理 | Pinia |
| 樣式 | Tailwind CSS v4 + SCSS |
| HTTP | Axios |
| 表單驗證 | VeeValidate + `@vee-validate/rules` |
| 動畫 | AOS、Animate.css、Swiper |
| 測試 | Vitest + Vue Test Utils + happy-dom |

## 安裝與啟動

### 環境需求

- Node.js 18+
- pnpm

### 步驟

```bash
# 1. Clone 專案
git clone https://github.com/<your-username>/healthy-diet-vue3.git
cd healthy-diet-vue3

# 2. 安裝依賴
pnpm install

# 3. 設定環境變數
cp .env.example .env
# 編輯 .env，填入 API URL 與 UUID

# 4. 啟動開發伺服器
pnpm dev
```

### 其他指令

```bash
pnpm build        # TypeScript 型別檢查 + 正式建置
pnpm test:run     # 執行測試（單次）
pnpm type-check   # 僅執行型別檢查
```

## 專案架構

```
src/
├── api/            # API 模組（axios 實例 + 各資源端點）
├── assets/         # 靜態資源與 Tailwind 設定
├── components/
│   ├── frontend/   # 前台元件（Navbar、Banner、Carousel…）
│   ├── backend/    # 後台元件（Navbar、Toast）
│   └── shared/     # 共用元件（Modal、Pagination、Loading）
├── composables/    # 組合式函式
├── router/         # 路由設定與 navigation guard
├── stores/         # Pinia stores
├── types/          # TypeScript 型別定義
├── utils/          # 工具函式
└── views/
    ├── frontend/   # 前台頁面（首頁、商品、購物車、結帳）
    └── backend/    # 後台頁面（登入、商品 / 訂單 / 優惠券管理）
```

## 授權

MIT License
