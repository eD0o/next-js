import Access from "@/components/access";

export default async function Home() {

  return (
    <main>
      <h1>Hello World</h1>
      <p>
        Reload to see the new timestamps: <br />
        <Access/>
      </p>
    </main>
  );
}
