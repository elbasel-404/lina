import { Get } from "@/app/components/Get";
import { Set } from "@/app/components/Set";
// import { get } from "@/app/db/get";
// import { set } from "@/app/db/set";

const TestGlobalDBPage = async () => {
  //   const userName = await get<string>("userName");
  return (
    <main>
      <section>
        <h1>Test Global DB Page</h1>
        {/* <p>username: {userName}</p> */}
        <Get key="userName" />
      </section>
      <section>
        <Set>
          <input type="text" name="userName" />
          <button type="submit">Set Username</button>
        </Set>
      </section>
    </main>
  );
};

export default TestGlobalDBPage;
