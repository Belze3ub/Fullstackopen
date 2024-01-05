import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-label';
import { DialogClose, DialogFooter } from './ui/dialog';

const BlogForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    };
    dispatch(createBlog(newBlog));
  };
  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input id="title" defaultValue="" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="author" className="text-right">
          Author
        </Label>
        <Input id="author" defaultValue="" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="url" className="text-right">
          Url
        </Label>
        <Input id="url" defaultValue="" className="col-span-3" />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit">Create</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};

export default BlogForm;
