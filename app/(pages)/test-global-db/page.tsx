import { Get } from "@/app/components/Get";
import { Set } from "@/app/components/Set";

const TestGlobalDBPage = () => {
  return (
    <main>
      <Get label="userName" dbKey="userName" />
      <Set>
        <input type="text" name="userName" />
        <button type="submit">Set Username</button>
      </Set>
    </main>
  );
};

export default TestGlobalDBPage;
