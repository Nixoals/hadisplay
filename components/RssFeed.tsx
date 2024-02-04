"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface RssItem {
    title: string;
    description: string;
  }

const RssFeed = () => {
    const [items, setItems] = useState<RssItem[]>([]);
    const [item, setItem] = useState({} as any);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = '/api/rss';
                const response = await axios.get(url);
                const data = response.data;
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'application/xml');
                const itemsNodeList = doc.querySelectorAll('item');
                // Convertir NodeList en Array
                const itemsArray = Array.from(itemsNodeList).map(item => ({
                    title: item.querySelector('title')?.textContent || "Titre inconnu",
                    description: item.querySelector('description')?.textContent || "Pas de description",
                }));
                setItems(itemsArray);
                setItem(itemsArray[0]);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            const index = items.indexOf(item);
            setItem(items[index + 1] || items[0]);
        }, 20000);
        return () => clearInterval(interval);
    }, [item]);

    return (
        <>
            {!loading && (
                <div className="w-full h-full flex justify-center">
                    <div className="flex flex-col items-center w-[400px] ">
                        <h1 className="text-2xl font-bold">Le monde</h1>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold">{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RssFeed;
