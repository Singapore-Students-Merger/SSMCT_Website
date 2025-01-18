"use client"

import GradientBg from "@/components/GradientBg";
import { SearchBar, FilterBar, FilterOptions, FilterOption } from "@/components/SearchTools";
import { useState } from "react";
import { Card } from "@/components/Card";
import { WriteupSummary } from "@/types/writeups";
import { useMemo } from "react";

const difficulty = [
    {label:"Easy", id: "Easy"},
    {label:"Medium", id: "Medium"},
    {label:"Hard", id: "Hard"},
]

const sortOptions = [
    {label:"Newest", id: "Newest"},
    {label:"Oldest", id: "Oldest"},
    // {label:"Most Viewed", id: "Most Viewed"},
    // {label:"Least Viewed", id: "Least Viewed"},
]

interface Filter {
    topics: {label: string, id: string}[];
    categories: {label: string, id: string}[];
    difficulty: {label: string, id: string}[];
    sort: string;
}
interface WriteupsPageProps {
    data: WriteupSummary[];
    categories: {name: string, id: string, thumbnail:string}[];
    topics: {title: string, id: string}[];
}
export default function WriteupsPage({data, categories, topics}: WriteupsPageProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [retractFilter, setRetractFilter] = useState(false);
    const [filters, setFilters] = useState<Filter>({
        topics: [],
        categories: [],
        difficulty: [],
        sort: "Newest"
    });
    const formattedCategories = useMemo(
        () => categories.map((category) => ({ label: category.name, id: category.id })),
        [categories]
    );
    const formattedTopics = useMemo(
        () => topics.map((topic) => ({ label: topic.title, id: topic.id })),
        [topics]
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

            return matchesSearchQuery && matchesTopics && matchesCategories && matchesDifficulty;
        });
    }, [data, searchQuery, filters]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            switch (filters.sort) {
                case "Newest":
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case "Oldest":
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                // case "Most Viewed":
                //     return b.views - a.views;
                // case "Least Viewed":
                //     return a.views - b.views;
                default:
                    return 0;
            }
        });
    }, [filteredData, filters.sort]);

    const sortHandler = (option) => {
        setFilters((old) => ({...old, sort: option}));
    }
    const topicHandler = (options) => {
        setFilters((old) => ({...old, topics: options}));
    }
    const categoryHandler = (options) => {
        setFilters((old) => ({...old, categories: options}));
    }
    const difficultyHandler = (options) => {
        setFilters((old) => ({...old, difficulty: options}));
    }
    return (
        <GradientBg gradientPosition='bottom'>
            <h1 className="text-5xl text-white text-center font-bold py-8">Writeups</h1>
            <div className="flex justify-center w-8/12 m-auto gap-4">
                <div className="flex-grow">
                    <SearchBar className = "w-full" setSearchQuery={setSearchQuery} value = {searchQuery} placeholder="Search Writeups"/>
                </div>
                <FilterBar retract = {retractFilter} setRetract={setRetractFilter}/>
            </div>
            <FilterOptions>
                <FilterOption setSelected = {sortHandler} label = "Sort By" options = {sortOptions} searchable={false} multiSelect={false}/>
                <FilterOption setSelected = {topicHandler} value = {filters["topics"]} label = "Filter Topics" options = {formattedTopics} searchable={true} multiSelect={true}/>
                <FilterOption setSelected = {categoryHandler} value = {filters["categories"]} label = "Filter Categories" options = {formattedCategories} searchable={false} multiSelect={true}/>
                <FilterOption setSelected = {difficultyHandler}  value = {filters["difficulty"]} label = "Filter Difficulty" options = {difficulty} searchable={false} multiSelect={true}/>
            </FilterOptions>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-10/12 m-auto">
                {sortedData.map((writeup) => <Card info={writeup} key={writeup.id}/>)}
            </div>
        </GradientBg>
    )
}