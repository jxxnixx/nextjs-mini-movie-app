import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  )
    //  프론트는 localhost 3000 URL을 가지고 있지만,
    //  이 경우는 백엔드(서버)만 건드는 것이라, 앞 URL이 없기 때문에
    //  상대 주소 /api/movies만 작성하면 에러
    .json();
  return {
    props: {
      results,
    },
  };
}
