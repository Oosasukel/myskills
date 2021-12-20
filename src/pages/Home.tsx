import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: number;
  name: string;
}

export const Home = () => {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [grettings, setGrettings] = useState('');

  const handleAddNewSkill = useCallback(() => {
    const data = {
      id: new Date().getTime(),
      name: newSkill,
    };

    setMySkills(previousState => [...previousState, data]);
  }, [newSkill]);

  const handleRemoveSkill = useCallback(
    (id: number) => {
      setMySkills(previousState =>
        previousState.filter(skill => skill.id !== id),
      );
    },
    [newSkill],
  );

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGrettings('Good morning');
    } else if (currentHour < 18) {
      setGrettings('Good afternoon');
    } else {
      setGrettings('Good night');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Rodrigo</Text>
      <Text style={styles.grettings}>{grettings}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button title="Add" onPress={handleAddNewSkill} />

      <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>

      <FlatList
        data={mySkills}
        renderItem={({item}) => (
          <SkillCard
            onPress={() => handleRemoveSkill(item.id)}
            skill={item.name}
            key={item.id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  grettings: {
    color: '#fff',
  },
});
