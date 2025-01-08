import { WriteupDetails } from "@/types/writeups";
import GradientBg from "@/components/GradientBg";
import ChallengeDetail from "@/components/ChallengeDetail";
import Chip from "@/components/Chip";

interface ChallengeDetailSectionProps {
    writeupDetails: WriteupDetails;
    estimatedReadTime: number;
}
export default function ChallengeDetailSection({writeupDetails, estimatedReadTime}: ChallengeDetailSectionProps ) {
    console.log(writeupDetails)
    return <GradientBg className="py-8 px-16" gradientPosition="bottom">
        <h1 className="text-white text-5xl font-bold text-center">{writeupDetails.title}</h1>
        <p className="text-center text-white mt-4 mb-2 text-lg ">Published on: {writeupDetails.date}</p>
        <p className="text-center text-lg">{estimatedReadTime} min read · Posted by {writeupDetails.author}</p>
        <div className = "grid grid-cols-1 md:grid-cols-2 my-4 gap-y-4 gap-x-24">
            <h2 className="text-3xl font-bold text-white border-b-2 border-tertiary order-1">Challenge Details</h2>
            <h2 className="text-3xl font-bold text-white border-b-2 border-tertiary order-3 md:order-2">Description</h2>
            <div className = "grid grid-cols-2 lg:grid-cols-3 gap-2 md:order-3 order-2">
                <ChallengeDetail title="Category" className="order-1">
                    {writeupDetails.categories[0]}
                </ChallengeDetail>
                <ChallengeDetail title="Difficulty" className="order-2">
                    {writeupDetails.difficulty}
                </ChallengeDetail>
                <ChallengeDetail title="Topics" className="col-span-2 row-span-1 lg:col-span-1 lg:row-span-2 order-5 lg:order-3">
                    <div className="flex flex-wrap gap-2 items-start justify-start overflow-auto h-full">
                        {writeupDetails.topics.map((topic, index) => (<Chip className = "text-sm font-semibold rounded-lg px-4 py-1 text-center" key={index}>{topic}</Chip>))}
                    </div>
                </ChallengeDetail>
                <ChallengeDetail title="Competition" className="order-3 lg:order-3">
                    {writeupDetails.ctf}
                </ChallengeDetail>
                <ChallengeDetail title="Author" className="order-4 lg:order-4">
                    {writeupDetails.author}
                </ChallengeDetail>
                
                
            </div>
            <div className="order-4 lg:order-4">
                <p className="text-white text-lg">
                {writeupDetails.description}
                </p>
                {writeupDetails.source &&
                    <a className = "text-[#3182ce] text-lg" href = {writeupDetails.source}>Link To Source</a>
                }
            </div>

        </div>
        <div>
        </div>
        </GradientBg>
}