import { Button } from './ui/button';
import { GanttChartSquare } from 'lucide-react';

const Blog = ({ blog }) => {
  return (
    <div className="flex border items-center my-2">
      <GanttChartSquare />
      <div>
        <Button variant="link">
          {blog.title} by {blog.author}
        </Button>
      </div>
    </div>
  );
};

export default Blog;
