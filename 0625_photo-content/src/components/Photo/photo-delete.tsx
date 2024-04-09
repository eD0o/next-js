export default async function PhotoDelete({ id }: { id: string }) {
  return (
    <div>
      <button>Delete: {id}</button>
    </div>
  );
}
