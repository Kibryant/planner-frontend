import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Title } from "@/components/title";
import { Back } from "@/components/back";
import { BottomButton } from "@/components/bottom-button";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { TaskCard } from "@/components/task-card";
import { TaskPlaceholder } from "@/components/task-placeholder";
import { usePostPlanner } from "@/hooks/usePostPlanner";

export default function PostPlanner() {
  const { day } = useLocalSearchParams();

  const myDay = Array.isArray(day) ? day[0] : day;

  const {
    control,
    handleSubmit,
    tasks,
    placeholders,
    errors,
    selectedTask,
    modalVisible,
    openModal,
    closeModal,
    completeDailyTask,
    handleDeleteAllDailyTasks,
    onSubmit,
  } = usePostPlanner({ day: myDay });

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="flex-1 px-8">
        <Back />

        <Title title={day as string} />

        <TouchableOpacity
          onPress={handleDeleteAllDailyTasks}
          className="bg-primary rounded-full p-2 w-16 h-16 items-center justify-center mt-4 absolute top-8 right-4"
        >
          <Feather name="trash" size={24} color="#f4f4f5" />
        </TouchableOpacity>

        <View className="flex-1 mt-20">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={() => completeDailyTask({ taskId: task.id })}
              onPress={() =>
                openModal({
                  id: task.id,
                  title: task.title,
                  description: task.description,
                })
              }
            />
          ))}

          {placeholders.map((placeholder, index) => (
            <TaskPlaceholder
              key={`placeholder-${index + 1}`}
              placeholder={placeholder}
              onPress={() => openModal({ title: placeholder, description: "" })}
            />
          ))}
        </View>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-center items-center bg-black/80">
              <LinearGradient
                colors={["#EF0052", "#4E001D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  padding: 1,
                  borderRadius: 12,
                  marginBottom: 18,
                }}
              >
                <View className="bg-[#4F001D] rounded-xl p-4 w-9/12 justify-center items-center max-h-[400px]">
                  <TouchableOpacity
                    onPress={closeModal}
                    className="absolute top-2 right-2 border border-primary rounded-full p-1"
                  >
                    <Feather name="x" size={20} color="#fb005d" />
                  </TouchableOpacity>

                  <Text className="text-zinc-100 text-2xl mb-4 font-zona-semibold mt-[10px] text-center">
                    {selectedTask?.title}
                  </Text>

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder={selectedTask?.title || "Título"}
                        placeholderTextColor="#AC0040"
                        className="min-w-full h-12 bg-[#47001B] text-zinc-100 rounded-3xl px-20 text-center"
                        accessibilityLabel="Campo de título da tarefa"
                        accessibilityHint="Digite o título da tarefa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        maxLength={50}
                      />
                    )}
                    name="title"
                  />
                  {errors.title && (
                    <Text className="text-red-500 text-sm font-zona-regular mt-1">
                      {errors.title.message}
                    </Text>
                  )}

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder={selectedTask?.description || "Descrição"}
                        placeholderTextColor="#AC0040"
                        className="w-full h-40 bg-[#47001B] text-zinc-100 rounded-3xl px-16 mb-3 min-w-96 max-w-96 text-center mt-8"
                        accessibilityLabel="Campo de descrição da tarefa"
                        accessibilityHint="Digite a descrição da tarefa"
                        maxLength={100}
                        multiline
                        textAlignVertical="auto"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="description"
                  />

                  {errors.description && (
                    <Text className="text-red-500 text-sm font-zona-regular">
                      {errors.description.message}
                    </Text>
                  )}

                  <TouchableOpacity
                    className="bg-primary rounded-full items-center justify-center w-16 h-16 mt-5"
                    onPress={handleSubmit(onSubmit)}
                  >
                    <Feather name="check" size={24} color="#f4f4f5" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      <View className="mt-10 items-center flex-row justify-center">
        <BottomButton />
      </View>
    </View>
  );
}
