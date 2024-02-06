import { Link } from "react-router-dom";

export default function PopularPoll({ poll }: { poll: PollType }) {
  return (
    <div className="bg-white p-4 py-6 md:p-6 rounded-[40px] ">
      <Link to={`/democracy/voting/${poll.id}`}>
        <div className="mb-11">
          <h4 className="text-dark">{poll.title}</h4>
          <p className="text-sm font-light text-subtle_text">
            {new Date(poll.createdAt).toDateString()}
          </p>
        </div>

        <p className="text-[#64748B] font-medium text-sm line-clamp-4 ">
          {poll.description}
        </p>

        <div className="flex flex-wrap items-center gap-8 mt-4">
          <div className="flex gap-[6px]">
            {poll.votingSDGs.length > 0 &&
              poll.votingSDGs.map((sdg) => (
                <img
                  src={sdg.sdg.banner}
                  key={sdg.sdg_id}
                  alt="sdg"
                  className="w-12"
                />
              ))}
          </div>

          <div className="flex items-center gap-2 rounded-[10px] whitespace-nowrap px-2 py-1 text-white bg-dark text-xs ">
            <span className="text-sm material-symbols-outlined">forum</span>
            {poll.total_comments_cache} Comments
          </div>
        </div>
      </Link>
    </div>
  );
}
