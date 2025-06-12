import { useState } from "react"
interface ChangeProfileProps {
  setUsername: (username: string) => void;
}

export const ChangeProfile = ({ setUsername }: ChangeProfileProps) => {
  const [newUsername, setNewUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername.trim().length > 0) {
      setUsername(newUsername);
      setNewUsername("");
    }
  };

  return (
    
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
          placeholder="Enter new username"
          className="px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={!newUsername.trim()}
        >
          Update Username
        </button>
      </div>

  );
};
