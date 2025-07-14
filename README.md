# 🗺️ Geo Processor Frontend (Next.js)

This project was deployed in vercel and you can visit this project at [Geo Processor Frontend](https://geo-processor-frontend-tdua.vercel.app).

This is the frontend interface for the **Geo Processor** application.  
It allows users to enter geographic coordinates, send them to the backend, and visualize the **computed bounding box** and **centroid** on a map.

---

## 🧱 Project Structure

This frontend was built using **Next.js 13+ (App Router)** and **Sass Modules** for styling.

---

## 🔧 Technical Stack & Decisions

| Tool              | Purpose                                      |
|-------------------|----------------------------------------------|
| `Next.js`         | Full React-based framework with file routing |
| `Sass Modules`    | Scoped styling per component                 |
| `react-leaflet`   | Map rendering using OpenStreetMap tiles      |
| `dynamic import`  | Used to disable SSR for Leaflet              |

- `react-leaflet` requires access to the `window` object, so `Map` is loaded dynamically with SSR disabled via `dynamic(() => import(...), { ssr: false })`.

---

## ⚙️ Functionality Overview

1. The user inputs latitude and longitude values via form fields.
2. A list of points can be constructed.
3. When "Process Points" is clicked:
   - A POST request is sent to the backend.
   - The backend returns:
     - A `centroid` object `{ lat, lng }`
     - A `bounds` object `{ north, south, east, west }`
4. The map renders:
   - A bounding box (`<Rectangle />`)
   - A marker for the centroid (`<Marker />`)

---

## ▶️ Running Locally

1. **Clone the repo**

```bash
git clone https://github.com/your-username/geo-processor-frontend.git
cd geo-processor-frontend

```
2. **Install dependencies**

```bash
npm install
# or
yarn install

```
3. **Set up environment variables**
Create a `.env.local` file in the root directory and add the following:

```bash
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8080

# Adjust the URL to match your backend API endpoint
```
4. **Run the development server**

```bash
npm run dev
# or
yarn dev

```
5. **Open your browser**
Navigate to `http://localhost:3000` to view the application.

This project is designed to be simple and straightforward, focusing on the core functionality of processing geographic coordinates. Feel free to explore and modify it as needed!