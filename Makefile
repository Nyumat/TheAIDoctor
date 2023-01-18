target: startBackend startFrontend

startBackend:
	cd backend && npm run dev 

startFrontend:
	cd frontend && npm run dev
