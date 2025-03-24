const personas = ['default', 'playful', 'formal', 'concise', 'academic'];

interface PersonaSelectorProps {
  onSelect: (persona: string) => void;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ onSelect }) => {
  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold">Persona:</label>
      <select onChange={(e) => onSelect(e.target.value)} className="border p-1 rounded">
        {personas.map((persona) => (
          <option key={persona} value={persona}>
            {persona}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PersonaSelector;
