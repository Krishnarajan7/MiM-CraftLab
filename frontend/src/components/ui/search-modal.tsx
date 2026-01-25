import React from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { LucideIcon, SearchIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useNavigate } from 'react-router-dom';

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: LucideIcon;
  shortcut?: string;
  href?: string;
};

type SearchModalProps = {
  children: React.ReactNode;
  data: SearchItem[];
  onSelect?: (item: SearchItem) => void;
};

export function SearchModal({ children, data, onSelect }: SearchModalProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (item: SearchItem) => {
    if (onSelect) {
      onSelect(item);
    } else if (item.href) {
      navigate(item.href);
    }
    setOpen(false);
    setQuery('');
  };

  const filteredData = query
    ? data.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : data;

  return (
    <Modal open={open} onOpenChange={setOpen} mobileDirection="top">
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent className="p-0 gap-0 overflow-hidden max-w-2xl md:top-[15%] md:translate-y-0">
        <VisuallyHidden>
          <ModalTitle>Search</ModalTitle>
        </VisuallyHidden>
        
        {/* Mobile Search Header */}
        <div className="flex items-center gap-2 p-3 border-b border-border bg-card md:hidden">
          <SearchIcon className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories..."
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/70"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
          <button 
  onClick={() => setOpen(false)} 
  className="text-sm font-medium text-foreground hover:text-primary"
>
  Cancel
</button>

        </div>

        {/* Desktop Command Interface */}
        <Command className="border-0 shadow-none hidden md:flex">
          <CommandInput
            placeholder="Search products, categories..."
            value={query}
            onValueChange={setQuery}
            className="h-14 text-base"
          />
          <CommandList className="max-h-[400px]">
            <CommandEmpty className="py-8">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <SearchIcon className="h-8 w-8" />
                <p>No results found for "{query}"</p>
                <Button onClick={() => setQuery('')} variant="ghost" size="sm">
                  Clear search
                </Button>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Results">
              {filteredData.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item)}
                  className="px-4 py-3 cursor-pointer"
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-3 text-muted-foreground" />}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <span className="text-xs text-foreground bg-muted px-2 py-1 rounded ml-2 shrink-0">
                    {item.category}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        {/* Mobile Results List */}
        <div className="md:hidden max-h-[70vh] overflow-y-auto">
          {filteredData.length === 0 && query ? (
            <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
              <SearchIcon className="h-8 w-8" />
              <p className="text-sm">No results found for "{query}"</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 w-full p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  {item.icon && (
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                  </div>
                   <span className="text-xs font-medium text-foreground shrink-0">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
}
