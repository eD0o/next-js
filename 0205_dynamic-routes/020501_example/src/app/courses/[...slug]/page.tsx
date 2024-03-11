type PageParams = {
  params: {
    slug: string[];
  };
};

export default function CoursesPage({ params }: PageParams) {
  console.log(params);
  
  return (
    <div>
      {params.slug.map((slug, index) => {
        return <div key={index}>{slug}</div>;
      })}
    </div>
  );
}
