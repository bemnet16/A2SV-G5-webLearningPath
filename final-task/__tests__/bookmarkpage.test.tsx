import { render, screen, waitFor } from "@testing-library/react";
import BookMarksPage from "@/app/(screens)/bookmarks/page";
import { useSession } from "next-auth/react";
import { BookmarkCardProps } from "@/app/lib/types";
import { useGetBookmarksQuery } from "../app/store/services/bookmarkApi";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("../app/store/services/bookmarkApi", () => ({
  ...jest.requireActual("../app/store/services/bookmarkApi"),
  useGetBookmarksQuery: jest.fn().mockReturnValue({
    isLoading: false,
    isError: false,
    isSuccess: true,
    data: [],
  }),
}));

jest.mock("../app/ui/bookmarks/bookmarkCard", () => ({
  __esModule: true,
  default: ({ bookmark }: { bookmark: BookmarkCardProps }) => (
    <div data-testid="bookmark-card">{bookmark.title}</div>
  ),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("BookMarksPage", () => {
  it("redirects if the user is unauthenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    });

    const { redirect } = require("next/navigation");

    render(
      <Provider store={store}>
        <BookMarksPage />
      </Provider>
    );

    expect(redirect).toHaveBeenCalledWith("/signin");
  });

  it("renders loading state", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { accessToken: "dummy-token" } },
    });

    (useGetBookmarksQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      isSuccess: false,
      data: [],
    });

    render(
      <Provider store={store}>
        <BookMarksPage />
      </Provider>
    );

    expect(screen.getByTestId("bookmarks-skeleton")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { accessToken: "dummy-token" } },
    });

    const mockError = new Error("Failed to fetch bookmarks");
    (useGetBookmarksQuery as jest.Mock).mockReturnValue({
      isError: true,
      error: mockError,
    });

    render(
      <Provider store={store}>
        <BookMarksPage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("error-component")).toBeInTheDocument();
      expect(screen.getByText("Retry")).toBeInTheDocument();
    });
  });

  it("renders empty bookmarks state", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { accessToken: "dummy-token" } },
    });

    (useGetBookmarksQuery as jest.Mock).mockReturnValue({
      isError: false,
      isSuccess: true,
      data: { data: [] },
    });

    render(
      <Provider store={store}>
        <BookMarksPage />
      </Provider>
    );

    expect(
      screen.getByText("No bookmarked opportunities found!")
    ).toBeInTheDocument();
  });

  it("renders bookmarks when available", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { accessToken: "dummy-token" } },
    });

    const mockBookmarks = [{ title: "Bookmark 1" }, { title: "Bookmark 2" }];

    (useGetBookmarksQuery as jest.Mock).mockReturnValue({
      isError: false,
      isSuccess: true,
      data: { data: mockBookmarks },
    });

    render(<BookMarksPage />);

    expect(screen.getByText("Bookmark 1")).toBeInTheDocument();
    expect(screen.getByText("Bookmark 2")).toBeInTheDocument();
  });
});
