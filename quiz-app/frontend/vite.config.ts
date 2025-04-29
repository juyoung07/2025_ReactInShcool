import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// "/api"로 시작하는 요청을 모두 프록시 서버를 통해서 대리 전송하도록 설정
			"/api": {
				target: "http://localhost:9000", // 필요한 경우 포트 번호는 변경
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
