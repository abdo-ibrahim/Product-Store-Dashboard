# 🛍️ Product Store Dashboard

A full-featured **Product Store Dashboard** that allows administrators to manage different store types efficiently using a RESTful API. This backend API supports full CRUD operations and is ready to be integrated with any frontend dashboard.

## Live Demo

[https://product-store-dashboard.vercel.app/](https://product-store-dashboard.vercel.app/)

---

## 📌 Features

- ✅ Get all store types with pagination
- 🔍 View store type by ID
- ➕ Create a new store type
- ✏️ Update existing store types
- 🌐 Multilingual support (Arabic / English)
- 🖼️ Upload & assign icons for each type
- 📦 JSON-based clean responses
- 🔐 Ready for admin dashboards or inventory systems

---

## 📡 API Endpoints

| Method | Endpoint                                         | Description                |
| ------ | ------------------------------------------------ | -------------------------- |
| GET    | `/api/StoreTypes/GetAllTypes?page=1&pageSize=10` | Get paginated store types  |
| GET    | `/api/StoreTypes/GetStoreTypeById/{id}`          | Get store type by ID       |
| POST   | `/api/StoreTypes/CreateStoreType`                | Create new store type      |
| PUT    | `/api/StoreTypes/UpdateStoreType/{id}`           | Update existing store type |

---

## 🧪 Sample Request (POST)

```bash
curl -X 'POST' \
  'http://your-ip-or-domain/Store.Api/api/StoreTypes/CreateStoreType' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "Id": "string",
  "Name_Ar": "string",
  "Name_En": "string",
  "IsActive": true,
  "Icon_path": "string"
}'
```
