# WebSocket Vehicle Tracker Frontend

Your frontend application should connect to a NestJS backend via WebSockets to receive live updates on vehicle locations and statuses.

### Instructions

- **Frontend Configuration:**

  - All environment variables should be defined in the `.env` file at the root of the `client/` directory.
  - The `.env` file should contain the following variables:

  ```env
  SOCKET_SERVER_URL=http://localhost:3000
  ```

- The web socket message type to connect is:

  ```typescript
  subscribeToVehicle;
  ```

- The web socket message type to disconnect is:

  ```typescript
  unsubscribeFromVehicle;
  ```

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this `README.md` further to fit the specific details and requirements of your project. If you encounter any issues or have additional questions, please refer to the [Troubleshooting](#troubleshooting) section or reach out for further assistance.
