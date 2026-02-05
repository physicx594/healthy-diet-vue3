# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue 3 + TypeScript + Vite 電商 SPA — 「健康飲食」健康食品訂購系統，包含前台（顧客端）與後台（管理端）。

## Commands

```bash
pnpm dev              # 啟動開發伺服器 (localhost:5173)
pnpm build            # TypeScript 型別檢查 + 正式建置
pnpm test             # 執行測試（watch 模式）
pnpm test:run         # 執行測試（單次，CI 適用）
pnpm type-check       # 僅執行 TypeScript 型別檢查
```

執行單一測試檔案：`pnpm vitest run src/__tests__/stores/cart.test.ts`

## Architecture

### 路由結構

使用 hash-based routing（`createWebHashHistory`）。前台路由掛載在 `/` 下（Home 為 layout wrapper），後台路由 `/admin` 設有 `requiresAuth` meta，由 navigation guard 配合 `authStore.checkAuth()` 驗證。

### API 層

`src/api/client.ts` 建立帶有 token interceptor 的 axios 實例，baseURL 來自 `VITE_API_URL` 環境變數。各 API 模組（products、cart、orders、coupons、auth、upload）各自匯出 API 物件，統一由 `api/index.ts` barrel export。

### 狀態管理 (Pinia)

所有 store 均使用 Composition API 風格（`defineStore('name', () => { ... })`），包含：
- **authStore** — 登入/登出/驗證
- **cartStore** — 購物車 CRUD、計算總價與運費（滿 3000 免運）
- **productsStore** — 商品列表與分頁
- **loadingStore** — 全域/表單 loading 狀態
- **notificationStore** — Toast 通知

### 元件組織

- `components/frontend/` — 前台專用（Navbar、Banner、SwiperCarousel 等）
- `components/backend/` — 後台專用（Navbar、Toast）
- `components/shared/` — 共用（BaseModal、Pagination、LoadingPage）
- `views/frontend/` 與 `views/backend/` — 頁面級元件

### 型別系統

`src/types/` 定義所有 TypeScript interface（Product、Cart、Order、Coupon、Pagination、ApiResponse 等），透過 barrel export 統一匯入。

## Coding Conventions

- **元件語法**：`<script setup>` + Composition API（ref、computed、onMounted）
- **路徑別名**：`@/` 對應 `./src`
- **樣式**：Tailwind CSS v4（utility-first），自訂主題定義在 `src/assets/tailwind.config.css`
  - 色彩：Primary (#264710)、Secondary (#de9e36)、Accent (#FEC81A)、Contrast (#800000)
  - 自訂動畫與 z-index 層級皆在此檔案內設定
- **命名慣例**：元件 PascalCase、store `useXxxStore`、API 模組 `xxxApi`
- **Git 提交**：conventional commits 格式，中文訊息（`type: 描述`）

## Testing

Vitest + happy-dom，全域 API 已啟用（不需 import describe/it/expect）。測試檔案位於 `src/__tests__/`，結構對映 `src/`。Store 測試需在 `beforeEach` 中呼叫 `setActivePinia(createPinia())`。

## Environment

需要 `.env` 檔（參考 `.env.example`）：
- `VITE_API_URL` — API base URL
- `VITE_UUID` — API 使用者 UUID
