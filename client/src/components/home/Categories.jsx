import React from "react";
// import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { categories } from "@/constants/data";
import { Link, useSearchParams } from "react-router-dom";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'All Categories';
  return (
    <>
      <Link to={`/create?category=${category !== 'All Categories'? category: ''}`} className={`bg-orange-400 hover:bg-orange-500 m-auto my-3 w-[85%] block text-center rounded py-2 ${category !=='All Categories'? 'ring-2 ring-black': ''}`} >Create Blog</Link>
      <Table className="border-2 border-slate-300">
        <TableHead>
          <TableRow>
            <TableCell><Link to='/'
            className={category === 'All Categories'? 'font-bold text-blue-600': ''}>All Categories</Link></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell><Link to={`/?category=${cat.type}`}
              className={category === cat.type ? 'font-bold text-blue-600': ''}>{cat.type}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Categories;
