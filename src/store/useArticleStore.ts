import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Article, ArticleComment } from '@/types';
import { INITIAL_ARTICLES } from '@/data/mockArticles';
import { ALL_BESPOKE_ARTICLES } from '@/data/bespokeArticlesData';

const COMBINED_STORE_ARTICLES: Article[] = [
  ...INITIAL_ARTICLES,
  ...ALL_BESPOKE_ARTICLES.filter(
    (b) => !INITIAL_ARTICLES.some((a) => a.slug === b.slug)
  ),
];

interface ArticleState {
  articles: Article[];
  bookmarkedSlugs: string[];
  searchQuery: string;
  selectedCategoryFilter: string;
  isSearchModalOpen: boolean;
  isMegaMenuOpen: boolean;
  selectedMagazineIssueId: string | null;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategoryFilter: (category: string) => void;
  setIsSearchModalOpen: (open: boolean) => void;
  setIsMegaMenuOpen: (open: boolean) => void;
  setSelectedMagazineIssueId: (id: string | null) => void;

  // Article CMS Actions
  addArticle: (newArticle: Omit<Article, 'id' | 'views' | 'comments' | 'sharesCount'> & Partial<Pick<Article, 'id' | 'views' | 'comments' | 'sharesCount'>>) => Article;
  updateArticle: (id: string, updatedFields: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  toggleFeatured: (id: string) => void;
  toggleTrending: (id: string) => void;
  toggleEditorPick: (id: string) => void;
  incrementViews: (slug: string) => void;
  addComment: (slug: string, comment: Omit<ArticleComment, 'id' | 'createdAt' | 'likes'>) => void;
  toggleBookmark: (slug: string) => void;
  resetToDefaultArticles: () => void;
}

export const useArticleStore = create<ArticleState>()(
  persist(
    (set, get) => ({
      articles: COMBINED_STORE_ARTICLES,
      bookmarkedSlugs: [],
      searchQuery: '',
      selectedCategoryFilter: 'all',
      isSearchModalOpen: false,
      isMegaMenuOpen: false,
      selectedMagazineIssueId: null,

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategoryFilter: (category) => set({ selectedCategoryFilter: category }),
      setIsSearchModalOpen: (open) => set({ isSearchModalOpen: open }),
      setIsMegaMenuOpen: (open) => set({ isMegaMenuOpen: open }),
      setSelectedMagazineIssueId: (id) => set({ selectedMagazineIssueId: id }),

      addArticle: (newArticleData) => {
        const id = newArticleData.id || `art-${Date.now()}`;
        const newArticle: Article = {
          ...newArticleData,
          id,
          views: newArticleData.views ?? 1,
          comments: newArticleData.comments ?? [],
          sharesCount: newArticleData.sharesCount ?? 0,
          publishedAt: newArticleData.publishedAt || new Date().toISOString(),
          status: newArticleData.status || 'published',
        };

        set((state) => ({
          articles: [newArticle, ...state.articles],
        }));

        return newArticle;
      },

      updateArticle: (id, updatedFields) => {
        set((state) => ({
          articles: state.articles.map((art) =>
            art.id === id ? { ...art, ...updatedFields } : art
          ),
        }));
      },

      deleteArticle: (id) => {
        set((state) => ({
          articles: state.articles.filter((art) => art.id !== id),
        }));
      },

      toggleFeatured: (id) => {
        set((state) => ({
          articles: state.articles.map((art) =>
            art.id === id ? { ...art, isFeatured: !art.isFeatured } : art
          ),
        }));
      },

      toggleTrending: (id) => {
        set((state) => ({
          articles: state.articles.map((art) =>
            art.id === id ? { ...art, isTrending: !art.isTrending } : art
          ),
        }));
      },

      toggleEditorPick: (id) => {
        set((state) => ({
          articles: state.articles.map((art) =>
            art.id === id ? { ...art, isEditorPick: !art.isEditorPick } : art
          ),
        }));
      },

      incrementViews: (slug) => {
        set((state) => ({
          articles: state.articles.map((art) =>
            art.slug === slug ? { ...art, views: art.views + 1 } : art
          ),
        }));
      },

      addComment: (slug, commentData) => {
        const newComment: ArticleComment = {
          id: `comment-${Date.now()}`,
          authorName: commentData.authorName,
          authorEmail: commentData.authorEmail,
          content: commentData.content,
          createdAt: new Date().toISOString(),
          likes: 0,
        };

        set((state) => ({
          articles: state.articles.map((art) =>
            art.slug === slug
              ? { ...art, comments: [newComment, ...art.comments] }
              : art
          ),
        }));
      },

      toggleBookmark: (slug) => {
        set((state) => {
          const exists = state.bookmarkedSlugs.includes(slug);
          return {
            bookmarkedSlugs: exists
              ? state.bookmarkedSlugs.filter((s) => s !== slug)
              : [...state.bookmarkedSlugs, slug],
          };
        });
      },

      resetToDefaultArticles: () => {
        set({ articles: INITIAL_ARTICLES });
      },
    }),
    {
      name: 'vanguard_chronicle_articles_store_v3',
      // We skip hydration errors by handling mounted client checks where appropriate
    }
  )
);
