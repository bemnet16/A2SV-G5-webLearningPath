import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useDeleteBookmarkMutation } from "../app/store/services/bookmarkApi";
import { removeBookmark } from "../app/store/features/bookmarkSlice";
import { BookmarkCard } from "../app/ui/bookmarks/bookmarkCard";

jest.mock("../app/store/services/bookmarkApi", () => ({
  useDeleteBookmarkMutation: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

describe("BookmarkCard", () => {
  const bookmark = {
    title: "Test Bookmark",
    orgName: "Test Organization",
    opType: "Full-Time",
    location: "Remote",
    logoUrl: "https://example.com/logo.png",
    eventID: "1",
    datePosted: "2024-08-01",
    dateBookmarked: "2024-08-15",
  };

  const token = "dummy-token";
  const refetch = jest.fn();

  beforeEach(() => {
    (useDeleteBookmarkMutation as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({}),
      { isLoading: false },
    ]);
    (jest.requireMock("react-redux").useDispatch as jest.Mock).mockReturnValue(
      mockDispatch
    );
  });

  it("renders the BookmarkCard component", () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <BookmarkCard bookmark={bookmark} token={token} refetch={refetch} />
      </Provider>
    );

    expect(screen.getByText("Test Bookmark")).toBeInTheDocument();
    expect(screen.getByText("Test Organization")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", bookmark.logoUrl);
  });

  it("calls deleteBookmark and removes bookmark on delete button click", async () => {
    const deleteBookmarkMock = jest.fn().mockResolvedValue({ error: null });
    (useDeleteBookmarkMutation as jest.Mock).mockReturnValue([
      deleteBookmarkMock,
      { isLoading: false },
    ]);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BookmarkCard bookmark={bookmark} token={token} refetch={refetch} />
      </Provider>
    );

    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);

    await waitFor(() =>
      expect(deleteBookmarkMock).toHaveBeenCalledWith({
        id: bookmark.eventID,
        token,
      })
    );
    expect(mockDispatch).toHaveBeenCalledWith(removeBookmark(bookmark.eventID));
    expect(refetch).toHaveBeenCalled();
  });

  it("shows loading state when deleting a bookmark", () => {
    (useDeleteBookmarkMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: true },
    ]);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BookmarkCard bookmark={bookmark} token={token} refetch={refetch} />
      </Provider>
    );

    expect(screen.getByRole("button")).toContainElement(
      screen.getByRole("img")
    );
    expect(screen.getByRole("img")).toHaveClass("animate-spin");
  });
});
