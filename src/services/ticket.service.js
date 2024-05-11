import axios from "axios";

// // const BASE_URL = "http://54.91.192.223:3000/api";
const BASE_URL = "http://127.0.0.1:3000/api";

const ticketService = {
  createTicket: async (ticketData) => {
    try {
      const response = await axios.post(`${BASE_URL}/ticket/`, ticketData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error al crear el ticket:", error);
      throw error;
    }
  },

  updateTicket: async (id, ticketData) => {
    try {
      const response = await axios.put(`${BASE_URL}/ticket/${id}`, ticketData);

      return response.data;
    } catch (error) {
      console.error("Error al actualizar el ticket:", error);
      throw error;
    }
  },

  deleteTicket: async (ticketId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/tickets/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el ticket:", error);
      throw error;
    }
  },
};

export default ticketService;
