export interface SimpleBlogCardProps {
    _id: string;
    title: string;
    smallDescription: string;
    publishedAt: string;
    titleImage: any;
    currentSlug: string;
    author: AuthorProps;
    category: CategoryProps;
    views: number;
}

export interface CategoryProps {
    _id: string;
    title: string;
    slug: string;
}

export interface AuthorProps {
    name: string;
    slug: string;
    profileImage: any;
}

export interface FullBlog {
    _id: string;
    title: string;
    smallDescription: string;
    publishedAt: string;
    titleImage: any;
    currentSlug: string;
    author: AuthorProps;
    category: CategoryProps;
    views: number;
    content: any;
}

