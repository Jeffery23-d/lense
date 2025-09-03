import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import AnimalReport from "../components/Reports";

export default function App() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [status, setStatus] = useState("idle");
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState([]);

  useEffect(() => {
    if (status === "completed" && capturedPhoto) {
      const sendToAPI = async () => {
        try {
          console.log("📤 Sending photo to Gemini API...");

          // Convert the captured image to Base64
          const base64Image = await FileSystem.readAsStringAsync(
            capturedPhoto,
            {
              encoding: FileSystem.EncodingType.Base64,
            }
          );

          const prompt = `
        You are an animal scan assistant. Given an image of an animal, return structured data in JSON format with the following fields:

        {
          "name": "string",
          "category": "string",
          "vitality_score": 9.5,
          "status": "Healthy | Unhealthy",
          "indicators": {
            "coat_condition": "string (max 4 words)",
            "eyes": "string (max 4 words)",
            "activity_level": "None | Minimal | Moderate | High"
          },
          "nutrition": {
            "calories": "string (e.g., '143 kcal')",
            "protein": "string (e.g., '27 g')",
            "fat": "string (e.g., '3 g')",
            "iron": "string (e.g., '3.7 mg')",
            "water": "string (e.g., '69%')"
          },
          "remarks": [
            "string",
            "string"
          ]
        }

        Important: 
        - vitality_score must be a number (not a string)
        - Keep coat_condition and eyes descriptions short
        - Respond ONLY with the JSON object, no extra words.
        `;

          const model = "models/gemini-2.5-pro";
          const apiKey = "AIzaSyBPGhk4Wr6KHphxEHdVE3OsExazBtjA7W4";

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      { text: prompt },
                      {
                        inlineData: {
                          mimeType: "image/jpeg",
                          data: base64Image,
                        },
                      },
                    ],
                  },
                ],
              }),
            }
          );

          const data = await response.json();
          console.log("✅ Gemini API raw response:", data);

          // Extract model's text output and parse JSON
          let textResponse =
            data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

          // Remove triple backticks and extra markers
          textResponse = textResponse
            .replace(/```json/i, "")
            .replace(/```/g, "")
            .trim();

          let parsedReport;
          try {
            parsedReport = JSON.parse(textResponse);
          } catch (err) {
            console.error(
              "⚠️ Failed to parse JSON from Gemini:",
              err,
              textResponse
            );
            parsedReport = null;
          }

          // Show the report with parsed data
          setShowReport(true);

          setReport(parsedReport);
          console.log(JSON.stringify(parsedReport), "parsReport");

          // Optional: Pass parsedReport to AnimalReport
          // setReportData(parsedReport);
        } catch (error) {
          console.error("❌ API error:", error);
        }
      };

      sendToAPI();
    }
  }, [status]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedPhoto(photo.uri);
        setStatus("preview");

        setTimeout(() => {
          setStatus("processing");

          setTimeout(() => {
            setStatus("completed");
          }, 2000);
        }, 5000);
      } catch (e) {
        console.log("Failed to take picture:", e);
      }
    }
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>

        {showReport ? (
         <>
           <AnimalReport
            photoUri={capturedPhoto ?? ""}
            data={report}
            onClose={() => {
              setShowReport(false);
              setCapturedPhoto(null);
              setStatus("idle");
            }}
          />
         </>
        ):
        (<>
        {/* ✅ Focus Scanner Brackets */}
        {status === "idle" && (
          <View style={styles.overlay}>
            <View style={styles.focusScanner}>
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
            </View>
          </View>
        )}

      

        {/* 📷 Captured Preview / Processing / Completed */}
        {status === "preview" && capturedPhoto && (
          <BlurView intensity={50} style={styles.overlay}>
            <Image
              source={{ uri: capturedPhoto }}
              style={styles.previewImage}
            />
          </BlurView>
        )}

        {status === "processing" && (
          <BlurView intensity={50} style={styles.overla}>
            <View
              style={{
                width: 300,
                height: 300,
                borderRadius: 50,
                overflow: "hidden",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 4,
              }}
            >
              <Text style={styles.completedText}>Processing...</Text>
            </View>
          </BlurView>
        )}

        {status === "completed" && (
          <BlurView intensity={50} style={styles.overla}>
            <View
              style={{
                width: 300,
                height: 300,
                borderRadius: 50,
                overflow: "hidden",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 4,
              }}
            >
              <Ionicons name="checkmark-circle" size={40} color="#21c64b" />
              <Text style={styles.completedText}>Completed</Text>
            </View>
          </BlurView>
        )}

    
          <View style={styles.bottomPanel}>
            <View style={styles.scanButtonWrapper}>
              <TouchableOpacity
                disabled={Boolean(capturedPhoto)}
                onPress={takePicture}
                style={styles.scanButton}
              >
                <MaterialIcons name="qr-code-scanner" size={30} color="white" />
              </TouchableOpacity>
              <Text style={styles.zoomText}>1x</Text>
            </View>
          </View>
        
        </>)
        }
      </CameraView>
    </View>
  );
}

const SCANNER_SIZE = 300;
const BRACKET_SIZE = 40;
const LINE_WIDTH = 6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  topOverlay: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  scanInstructionBox: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  scanInstructionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  focusScanner: {
    width: SCANNER_SIZE,
    height: SCANNER_SIZE,
    position: "relative",
  },
  cornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
    borderTopWidth: LINE_WIDTH,
    borderLeftWidth: LINE_WIDTH,
    borderColor: "white",
    borderTopLeftRadius: 30,
  },
  cornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
    borderTopWidth: LINE_WIDTH,
    borderRightWidth: LINE_WIDTH,
    borderColor: "white",
    borderTopRightRadius: 30,
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
    borderBottomWidth: LINE_WIDTH,
    borderLeftWidth: LINE_WIDTH,
    borderColor: "white",
    borderBottomLeftRadius: 30,
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
    borderBottomWidth: LINE_WIDTH,
    borderRightWidth: LINE_WIDTH,
    borderColor: "white",
    borderBottomRightRadius: 30,
  },
  overla: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonContainer: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  processingBox: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
    borderRadius: 15,
  },
  completedBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  completedText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    zIndex: 80,
    width: "100%",
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  scanButtonWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  scanButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#21c64b",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  scanIcon: {
    fontSize: 20,
    color: "#fff",
  },
  zoomText: {
    fontSize: 16,
    color: "#555",
  },
});
