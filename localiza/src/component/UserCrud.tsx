import React, { useState, useEffect } from "react";

interface User {
  id: number;
  nome: string;
  email: string;

}

const UserCrud: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ id: 0, nome: '', email: '' });
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }))
  };

  const handleAddUser = (): void => {
    setUsers((prevState) => [...prevState, { ...newUser, id: Date.now() }])
    setNewUser({ id: 0, nome: '', email: '' });
  };

  const handleEditUser = (id: number): void => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setEditingUserId(id);
      setNewUser(userToEdit);
    }
  };

  const handleUpdateUser = (): void => {
    setUsers((prevState) =>
      prevState.map((user) => (user.id === newUser.id ? { ...newUser } : user))
    );
    setEditingUserId(null);
    setNewUser({ id: 0, nome: '', email: '' });
    ;
  }
  const handleDeleteUser = (id: number): void => {
    setUsers((prevState) => prevState.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2>Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nome} - {user.email}
            <button onClick={() => handleEditUser(user.id)}>Editar</button>
            <button onClick={() => handleDeleteUser(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <h2>Adicionar Usuário</h2>
      <input
        type="text"
        placeholder="Nome"
        name="nome"
        value={newUser.nome}
        onChange={handleInputChange}
      />
      <input
        type="email"
        placeholder="E-mail"
        name="email"
        value={newUser.email}
        onChange={handleInputChange}
      />
      {editingUserId ? (
        <button onClick={handleUpdateUser}>Atualizar</button>
      ) : (
        <button onClick={handleAddUser}>Adicionar</button>
      )}
    </div>
  );
};

export default UserCrud;



