import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Task = {
  id: string;
  title: string;
  done: boolean;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Mempelajari React Native", done: true },
    { id: "2", title: "Membuat aplikasi Task Manager", done: false },
    { id: "3", title: "Upload project ke GitHub", done: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const completed = tasks.filter((task) => task.done).length;

  function addTask() {
    const title = newTask.trim();

    if (!title) {
      Alert.alert("Perhatian", "Masukkan nama tugas terlebih dahulu.");
      return;
    }

    setTasks((current) => [
      ...current,
      { id: `${Date.now()}`, title, done: false },
    ]);
    setNewTask("");
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.eyebrow}>MY PRODUCTIVITY</Text>
            <Text style={styles.heading}>Task Manager</Text>
            <Text style={styles.subtitle}>
              Atur kegiatanmu, selesaikan satu per satu.
            </Text>

            <View style={styles.summary}>
              <Text style={styles.summaryLabel}>Progres tugas</Text>
              <Text style={styles.progress}>
                {completed} dari {tasks.length} selesai
              </Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        tasks.length ? (completed / tasks.length) * 100 : 0
                      }%`,
                    },
                  ]}
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Tambah Tugas</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Apa yang ingin dikerjakan?"
                placeholderTextColor="#9299A8"
                value={newTask}
                onChangeText={setNewTask}
                onSubmitEditing={addTask}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={addTask}
                accessibilityLabel="Tambah tugas"
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Daftar Tugas</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            Belum ada tugas. Yuk, tambahkan tugas pertamamu!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <TouchableOpacity
              style={[styles.checkbox, item.done && styles.checkboxDone]}
              onPress={() => toggleTask(item.id)}
              accessibilityLabel={
                item.done ? "Batalkan tugas selesai" : "Tandai tugas selesai"
              }
            >
              <Text style={styles.checkmark}>{item.done ? "✓" : ""}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.taskContent}
              onPress={() => toggleTask(item.id)}
            >
              <Text
                style={[styles.taskTitle, item.done && styles.taskCompleted]}
              >
                {item.title}
              </Text>
              <Text style={styles.taskStatus}>
                {item.done ? "Selesai" : "Sedang dikerjakan"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
              accessibilityLabel="Hapus tugas"
            >
              <Text style={styles.deleteText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <Text style={styles.footer}>Simple Task Manager • React Native</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  list: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 30,
  },
  eyebrow: {
    color: "#5268D9",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 8,
  },
  heading: {
    color: "#18213A",
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: "#747D91",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  summary: {
    backgroundColor: "#5268D9",
    borderRadius: 20,
    padding: 20,
    marginTop: 26,
    marginBottom: 28,
  },
  summaryLabel: {
    color: "#E5E9FF",
    fontSize: 14,
  },
  progress: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 16,
  },
  progressTrack: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#8998EB",
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    color: "#18213A",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 14,
    color: "#18213A",
    borderWidth: 1,
    borderColor: "#E4E8F0",
  },
  addButton: {
    width: 52,
    borderRadius: 14,
    backgroundColor: "#5268D9",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 34,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E9ECF3",
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#C9CFDC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: "#5268D9",
    borderColor: "#5268D9",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  taskContent: {
    flex: 1,
    marginRight: 8,
  },
  taskTitle: {
    color: "#18213A",
    fontSize: 14,
    fontWeight: "700",
  },
  taskCompleted: {
    color: "#9299A8",
    textDecorationLine: "line-through",
  },
  taskStatus: {
    color: "#9299A8",
    fontSize: 11,
    marginTop: 5,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  deleteText: {
    color: "#E05260",
    fontSize: 12,
    fontWeight: "700",
  },
  empty: {
    color: "#747D91",
    textAlign: "center",
    paddingVertical: 25,
    lineHeight: 22,
  },
  footer: {
    color: "#9299A8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 24,
  },
});
