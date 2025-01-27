"use client"
// TODO: Combine this with WriteupsPage.tsx into one component.
import GradientBg from "@/components/GradientBg";
import { SearchBar, FilterBar, FilterOptions, FilterOption } from "@/components/SearchTools";
import { useState } from "react";
import { Card } from "@/components/Card";
import { useMemo } from "react";
import { BlogSummary } from "@/types/blogs";
import { WriteupSummary } from "@/types/writeups";
interface SortOption {
    label: string;
    value: string;
}

interface SortOptionId {
    label: string;
    id: string
}

const difficulty = [
    {label:"Easy", id: "Easy"},
    {label:"Medium", id: "Medium"},
    {label:"Hard", id: "Hard"},
]

const sortOptions = [
    {label:"Newest", id: "Newest"},
    {label:"Oldest", id: "Oldest"},
]

interface Filter {
    topics: SortOptionId[];
    categories: SortOptionId[];
    difficulty: SortOptionId[];
    sort: SortOption;
    events: SortOptionId[];
}
interface PostProps {
    data: BlogSummary[] | WriteupSummary[];
    categories: {name: string, id: number, thumbnail:string | null}[];
    topics: {title: string, id: number}[];
    events: {title: string, id: number}[];
    type: "blog" | "writeup";
}
export default function Posts({type, data, categories, topics, events}: PostProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [retractFilter, setRetractFilter] = useState(false);
    const [filters, setFilters] = useState<Filter>({
        topics: [],
        categories: [],
        difficulty: [],
        sort: {label:"Newest", value: "Newest"},
        events: []
    });
    const formattedCategories = useMemo(
        () => categories.map((category) => ({ label: category.name, id: category.id })),
        [categories]
    );
    const formattedTopics = useMemo(
        () => topics.map((topic) => ({ label: topic.title, id: topic.id })),
        [topics]
    );

    const formattedEvents = useMemo(
        () => events.map((event) => ({ label: event.title, id: event.id })),
        [events]
    );

    
    const filteredData = useMemo(() => {
        return data.filter((writeup) => {
            const matchesSearchQuery =
                writeup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                writeup.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTopics =
                filters.topics.length === 0 ||
                filters.topics.some((topic) => writeup.topics.includes(topic.label));
            const matchesCategories =
                filters.categories.length === 0 ||
                filters.categories.some((category) => writeup.category === category.label);
            const matchesDifficulty =
                filters.difficulty.length === 0 ||
                filters.difficulty.some((diff) => writeup.difficulty === diff.label);
            const matchesEvents = 
                filters.events.length === 0 ||
                filters.events.some((event) => writeup.event === event.label);
            return matchesSearchQuery && matchesTopics && matchesCategories && matchesDifficulty && matchesEvents;
        });
    }, [data, searchQuery, filters]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            switch (filters.sort.value) {
                case "Newest":
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case "Oldest":
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                default:
                    return 0;
            }
        });
    }, [filteredData, filters.sort]);

    
    const sortHandler = (option: SortOption) => {
        setFilters((old) => ({...old, sort: option}));
    }
    const topicHandler = (options: SortOptionId[]) => {
        setFilters((old) => ({...old, topics: options}));
    }
    const categoryHandler = (options: SortOptionId[]) => {

        setFilters((old) => ({...old, categories: options}));
    }
    const difficultyHandler = (options: SortOptionId[]) => {
        setFilters((old) => ({...old, difficulty: options}));
    }
    const eventHandler = (options: SortOptionId[]) => {
        setFilters((old) => ({...old, events: options}));
    }
    return (
        <GradientBg gradientPosition='bottom'>
            <h1 className="text-5xl text-white text-center font-bold py-8">{type == "blog"?"View Our Latest Posts":"Writeups"}</h1>
            <div className="flex justify-center w-10/12 md:w-8/12 m-auto gap-4 mb-8 flex-col md:flex-row">
                <div className="flex-grow">
                    <SearchBar className = "w-full" setSearchQuery={setSearchQuery} value = {searchQuery} placeholder={type == "blog"?"Search Blogs":"Search Writeups"}/>
                </div>
                <FilterBar retract = {retractFilter} setRetract={setRetractFilter}/>
            </div>
            {retractFilter &&
            <FilterOptions>
                <FilterOption setSelected = {sortHandler} value = {filters['sort']} label = "Sort By" options = {sortOptions} searchable={false} multiSelect={false}/>
                <FilterOption setSelected = {topicHandler} value = {filters["topics"]} label = "Filter Topics" options = {formattedTopics} searchable={true} multiSelect={true}/>
                <FilterOption setSelected = {categoryHandler} value = {filters["categories"]} label = "Filter Categories" options = {formattedCategories} searchable={false} multiSelect={true}/>
                <FilterOption setSelected = {difficultyHandler}  value = {filters["difficulty"]} label = "Filter Difficulty" options = {difficulty} searchable={false} multiSelect={true}/>
                <FilterOption setSelected = {eventHandler}  value = {filters["events"]} label = {`Filter ${type == "blog"?"Event":"CTF"}`} options = {formattedEvents} searchable={false} multiSelect={true}/>
            </FilterOptions>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-10/12 m-auto">
                {sortedData.map((post) => <Card info={{...post,link:`/${type == "blog"?"blogs":"writeups"}/view/${post.id}`}} key={`post_${post.id}`}/>)}
            </div>
        </GradientBg>
    )
}