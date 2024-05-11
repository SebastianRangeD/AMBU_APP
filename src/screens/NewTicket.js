import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Axios from "axios"; // Importa Axios

export default function NewTicket() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [resTicket, setTicketData] = useState(null); // Estado para almacenar los datos del ticket

  const pickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ multiple: true });
      setSelectedFiles(result);
    } catch (error) {
      console.log("Error picking files:", error);
    }
  };

  const getTicket = async () => {
    try {
      let data = {
        _id: "663fb15157ebfc680638fdb9",
      };

      const response = await Axios.post(
        "http:3.91.151.179:3000/api/ticket/get-ticket",
        data
      );

      console.log(response.data);
      setTicketData(response.data); // Guardar los datos del ticket en el estado
      return response;
    } catch (error) {}
  };

  const uploadTicket = async () => {
    try {
      // Convertir cada archivo seleccionado a base64
      const base64Files = await Promise.all(
        selectedFiles.assets.map(async (file) => {
          const fileContent = await FileSystem.readAsStringAsync(file.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return { name: file.name, data: fileContent, type: "image" };
        })
      );

      // Crear el objeto de ticket con la evidencia adjunta
      const ticketData = {
        uid: "677D-A536",
        agent: "663047c895d4e6cc3084131c",
        date: { creation: "2024-04-30T14:00:00Z" },
        department: "663047b40de6cfd454613a0c",
        category: "fontaaanería",
        state: "activo",
        priority: "alta",
        comment: "La llave de paso del sector 1 está dañada, se presenta fuga",
        coordinates: {
          lat: "20.709628",
          lng: "-103.394887",
        },
        evidence: base64Files,
      };

      // Enviar la solicitud POST al servidor con los datos del ticket
      const response = await Axios.post(
        "http:3.91.151.179:3000/api/ticket",
        // "127.0.0.1:3000/api/ticket",
        ticketData
      );

      console.log("Ticket creado con éxito:", response.data);

      setSelectedFiles([]); // Reiniciar el estado después de agregar los archivos
    } catch (error) {
      console.error("Error al crear el ticket:", error);
    }
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "#fff" }}>
        {/* Selector de archivos */}
        <TouchableOpacity onPress={pickFiles} style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, color: "#007AFF" }}>
            Seleccionar archivos
          </Text>
        </TouchableOpacity>

        {/* Botón para subir archivos */}
        <TouchableOpacity onPress={uploadTicket} style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, color: "#007AFF" }}>Subir archivos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={getTicket} style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, color: "#007AFF" }}>Obtener ticket</Text>
        </TouchableOpacity>

        {/* Mostrar la información del ticket */}
        {resTicket && (
          <View>
            <Text>{`ID: ${resTicket[0]._id}`}</Text>
            <Text>{`Agente: ${resTicket[0].agent}`}</Text>

            {/* Mostrar las imágenes */}
            {resTicket[0].evidence.map((image, index) => {
              const imageDataBase64 = image.data.toString("base64");

              return (
                <Image
                  key={index}
                  source={{ uri: `data:image/jpeg;base64,${imageDataBase64}` }}
                  style={{ width: 200, height: 200 }}
                />
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
