import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTodoStore } from "./store/todoSlice";
import AwesomeAlert from "react-native-awesome-alerts";

export default function App() {
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number>(-1);
  const { todo, removeTodo } = useTodoStore();
  
  const removeTodoHandler = (index: number) => {
    setDeleteIndex(index);
    setIsAlert(!isAlert);
  };

  const onConfirmHandler = () => {
    setIsAlert(!isAlert);
    if (deleteIndex !== -1) {
      removeTodo(deleteIndex);
      setDeleteIndex(-1);
    }
  };

  const onCancelHandler = () => {
    setIsAlert(!isAlert);
    setDeleteIndex(-1);
  };

  return (
    <>
      <View className="py-40 px-4 min-h-full bg-slate-100">
        <StatusBar style="auto" />
        <Text className="text-4xl font-extrabold mb-2">Today's tasks</Text>
        <AwesomeAlert
          show={isAlert}
          title="Apakah Kamu Yakin?"
          message={`Task / Todo ini akan dihapus!`}
          closeOnTouchOutside
          showConfirmButton
          showCancelButton
          confirmText="Oke Hapus!"
          onConfirmPressed={onConfirmHandler}
          onCancelPressed={onCancelHandler}
        />
        <ScrollView>
          {todo.map((val, i) => (
            <TouchableOpacity key={i}>
              <View className={`flex flex-row items-center p-5 my-2 bg-white shadow-2xl rounded-2xl`}>
                <View className="bg-blue-400 h-8 w-8 rounded-lg"></View>
                <View className="flex flex-row justify-between items-center pr-8 w-full">
                  <Text className="ml-4 max-w-[250px]">{val}</Text>
                  <TouchableOpacity onPress={() => removeTodoHandler(i)}>
                    <View className="flex bg-red-400 rounded-full h-8 w-8 items-center justify-center">
                      <Text className="text-2xl text-white">-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <AddTask />
      </View>
    </>
  );
}

function AddTask() {
  const { todo, addTodo } = useTodoStore();
  const [text, setText] = useState<string>("");
  const [isAlert, setIsAlert] = useState<boolean>(false);

  // console.log(text);

  const handleClick = () => {
    if (text.length === 0) {
      setIsAlert(!isAlert);
    } else {
      addTodo(text);
      setText("");
    }
  };

  // console.log(todo);

  return (
    <View className="flex flex-row items-center w-full absolute bottom-8 right-4 px-4 my-8 justify-between">
      <TextInput
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder="Write A Task"
        className="bg-white shadow-2xl w-[75%] text-center h-14 rounded-full"
      ></TextInput>
      <TouchableOpacity onPress={() => handleClick()}>
        <Text className="h-16 w-16 text-4xl text-center py-3 rounded-full shadow-2xl bg-white">+</Text>
      </TouchableOpacity>
      <AwesomeAlert
        show={isAlert}
        title="Error!"
        message="Harap Masukkan Task / Todo!"
        closeOnTouchOutside
        showConfirmButton
        confirmText="Oke!"
        onConfirmPressed={() => {
          setIsAlert(!isAlert);
        }}
      />
    </View>
  );
}
